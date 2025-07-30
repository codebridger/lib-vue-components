#!/usr/bin/env node

import puppeteer from "puppeteer";
import fs from "fs/promises";
import TurndownService from "turndown";

class DocGenerator {
  constructor(baseUrl = "http://localhost:6006", options = {}) {
    this.baseUrl = baseUrl;
    this.browser = null;
    this.page = null;
    this.allDocs = [];
    this.visitedUrls = new Set();
    this.options = {
      outputFormat: options.outputFormat || "markdown", // 'markdown' or 'text'
      ...options,
    };

    // Initialize turndown service for HTML to Markdown conversion
    this.turndownService = new TurndownService({
      headingStyle: "atx",
      codeBlockStyle: "fenced",
      emDelimiter: "*",
      bulletListMarker: "-",
      strongDelimiter: "**",
    });

    // Configure turndown service for better code block handling
    this.turndownService.addRule("codeBlocks", {
      filter: ["pre"],
      replacement: function (content, node) {
        const code = node.querySelector("code");
        if (code) {
          // Extract language from class name (e.g., "language-javascript" -> "javascript")
          const language = code.className?.match(/language-(\w+)/)?.[1] || "";
          const codeContent = code.textContent || code.innerText || "";
          return `\n\`\`\`${language}\n${codeContent}\n\`\`\`\n\n`;
        }
        // If no code element found, treat the pre content as plain text
        const preContent = node.textContent || node.innerText || content;
        return `\n\`\`\`\n${preContent}\n\`\`\`\n\n`;
      },
    });

    // Configure turndown service for better table handling
    this.turndownService.addRule("tables", {
      filter: ["table"],
      replacement: function (content, node) {
        const rows = Array.from(node.querySelectorAll("tr"));
        if (rows.length === 0) return content;

        let markdown = "\n";

        // Process each row
        rows.forEach((row, rowIndex) => {
          const cells = Array.from(row.querySelectorAll("td, th"));
          if (cells.length === 0) return;

          // Create the row content
          const rowContent = cells
            .map((cell) => {
              const cellText = cell.textContent?.trim() || "";
              return cellText.replace(/\|/g, "\\|"); // Escape pipe characters
            })
            .join(" | ");

          markdown += `| ${rowContent} |\n`;

          // Add header separator after the first row (if it has th elements)
          if (rowIndex === 0 && row.querySelector("th")) {
            const separator = cells.map(() => "---").join(" | ");
            markdown += `| ${separator} |\n`;
          }
        });

        return markdown + "\n";
      },
    });

    // Configure turndown service to increase header levels for sub-headers
    this.turndownService.addRule("increaseHeaderLevels", {
      filter: ["h1", "h2", "h3", "h4", "h5", "h6"],
      replacement: function (content, node) {
        const level = parseInt(node.tagName.charAt(1));
        const newLevel = Math.min(level + 2, 6); // Increase by 2 levels, max h6
        const hashes = "#".repeat(newLevel);
        return `\n${hashes} ${content}\n\n`;
      },
    });

    // Configure turndown service to remove links while preserving text
    this.turndownService.addRule("removeLinks", {
      filter: ["a"],
      replacement: function (content, node) {
        // Return just the text content of the link
        return node.textContent || content;
      },
    });
  }

  async init() {
    console.log("🚀 Initializing Puppeteer browser...");
    this.browser = await puppeteer.launch({
      headless: false,
      defaultViewport: { width: 1920, height: 1080 },
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    this.page = await this.browser.newPage();

    // Set user agent to avoid detection
    await this.page.setUserAgent(
      "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36"
    );

    // Capture console output from the page
    this.page.on("console", (msg) => {
      if (msg.type() === "log") {
        console.log("Page log:", msg.text());
      }
    });
  }

  async navigateToStorybook() {
    console.log(`📖 Navigating to Storybook at ${this.baseUrl}...`);
    try {
      await this.page.goto(this.baseUrl, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });
      console.log("✅ Successfully loaded Storybook");
    } catch (error) {
      console.error("❌ Failed to load Storybook:", error.message);
      throw error;
    }
  }

  async findDocPages() {
    console.log(
      "🔍 Finding documentation pages with data-item-id ending in --docs..."
    );

    try {
      // Wait for the page to load
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Find and click all expand-all buttons
      await this.page.evaluate(() => {
        const expandAllButtons = Array.from(
          document.querySelectorAll('[data-action="expand-all"]')
        );
        console.log("Found expand-all buttons:", expandAllButtons.length);
        console.log("🖱️  Starting to click expand-all buttons...");

        expandAllButtons.forEach((button) => {
          button.click();
        });

        console.log("✅ Finished clicking expand-all buttons");
      });

      // Wait for expansion to complete
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Also try clicking on expandable menu items as backup
      await this.page.evaluate(() => {
        // Find all expandable menu items (those without links but with data-item-id)
        const expandableItems = Array.from(
          document.querySelectorAll("[data-item-id]")
        ).filter((el) => {
          const link = el.querySelector("a");
          return !link || !link.href; // Items without links are likely expandable
        });

        console.log("Found expandable items:", expandableItems.length);
        console.log("🖱️  Starting to click expandable items...");

        // Click on each expandable item to expand it
        expandableItems.forEach((item) => {
          item.click();
        });

        console.log("✅ Finished clicking expandable items");
      });

      // Wait a bit more for the expansion to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Find all elements with data-item-id ending in --docs
      const docElements = await this.page.evaluate(() => {
        // Get all elements with data-item-id ending in --docs that have links
        const allElementsWithLinks = Array.from(
          document.querySelectorAll('[data-item-id$="--docs"]')
        ).filter((el) => {
          const link = el.querySelector("a");
          return link && link.href;
        });

        console.log(
          "📄 Documentation pages (--docs):",
          allElementsWithLinks.length
        );

        // Use only documentation elements (ending with --docs)
        const elements = allElementsWithLinks;

        return elements
          .map((element) => {
            const dataItemId = element.getAttribute("data-item-id");
            // Find the link inside this element
            const link = element.querySelector("a");

            if (link && link.href) {
              // Extract meaningful title from data-item-id
              let title = "";
              if (dataItemId) {
                // Remove --docs suffix and convert to readable format
                const cleanId = dataItemId.replace("--docs", "");
                // Split by hyphens and capitalize each part
                const parts = cleanId
                  .split("-")
                  .map((word) => word.charAt(0).toUpperCase() + word.slice(1));

                // Add separator between category and item
                if (parts.length >= 2) {
                  title =
                    parts.slice(0, -1).join(" ") +
                    " / " +
                    parts[parts.length - 1];
                } else {
                  title = parts.join(" ");
                }
              }

              return {
                dataItemId: dataItemId,
                href: link.href,
                text:
                  link.textContent?.trim() || element.textContent?.trim() || "",
                title: title || link.textContent?.trim() || "Documentation",
              };
            }

            return null;
          })
          .filter((item) => item !== null && item.dataItemId && item.href);
      });

      console.log(
        `📄 Found ${docElements.length} documentation pages to process`
      );

      return docElements;
    } catch (error) {
      console.error("❌ Error finding documentation pages:", error.message);
      return [];
    }
  }

  async extractPageContent(docElement) {
    if (this.visitedUrls.has(docElement.href)) {
      console.log(`⏭️  Skipping already visited: ${docElement.title}`);
      return null;
    }

    console.log(
      `📖 Extracting content from: ${docElement.title} (${docElement.dataItemId})`
    );
    this.visitedUrls.add(docElement.href);

    try {
      // Navigate to the specific page
      await this.page.goto(docElement.href, {
        waitUntil: "domcontentloaded",
        timeout: 30000,
      });

      // Wait for content to load and try multiple strategies
      await new Promise((resolve) => setTimeout(resolve, 3000));

      // Try to wait for specific content to appear
      try {
        await this.page.waitForSelector(
          '.docblock, .markdown, article, main, [data-testid="story-panel"]',
          { timeout: 5000 }
        );
      } catch (e) {
        console.log("No specific content selectors found, continuing...");
      }

      // Handle "Show code" buttons before extracting content
      await this.handleShowCodeButtons();

      // Extract content from the iframe
      const content = await this.page.evaluate((dataItemId) => {
        // Get the iframe
        const iframe = document.querySelector("#storybook-preview-iframe");
        if (!iframe) {
          throw new Error("Storybook preview iframe not found");
        }

        // Get the iframe document
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) {
          throw new Error("Cannot access iframe content");
        }

        console.log("Extracting content from iframe document");

        // Get content from iframe body
        const contentElement = iframeDoc.querySelector("#storybook-docs");
        if (!contentElement) {
          throw new Error("No body element found in iframe");
        }

        // Clone the content element to avoid modifying the original
        const clonedContent = contentElement.cloneNode(true);

        // Remove all style tags and buttons from the cloned content
        const elementsToRemove = clonedContent.querySelectorAll(
          "style, button, [role='button'], .btn, .button"
        );
        elementsToRemove.forEach((element) => {
          element.remove();
        });

        const result = clonedContent.outerHTML;
        console.log(
          `Extracted content length: ${result.length} characters (after removing ${elementsToRemove.length} elements)`
        );
        return result;
      }, docElement.dataItemId);

      // Convert HTML to markdown using turndown service
      const finalContent = this.turndownService.turndown(content);

      return {
        title: docElement.title,
        dataItemId: docElement.dataItemId,
        url: docElement.href,
        content: finalContent.trim(),
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      console.error(
        `❌ Error extracting content from ${docElement.title}:`,
        error.message
      );
      return null;
    }
  }

  async handleShowCodeButtons() {
    console.log("🔍 Looking for 'Show code' buttons...");

    try {
      // Wait a bit for any dynamic content to load
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // Try to find and click "Show code" buttons in the main document
      const mainDocButtonsClicked = await this.page.evaluate(() => {
        const showCodeButtons = Array.from(
          document.querySelectorAll('button, [role="button"], .btn, .button')
        ).filter((button) => {
          const text = button.textContent?.trim().toLowerCase();
          return text === "show code" || text.includes("show code");
        });

        console.log(
          `Found ${showCodeButtons.length} 'Show code' buttons in main document`
        );

        let clickedCount = 0;
        showCodeButtons.forEach((button) => {
          try {
            button.click();
            clickedCount++;
            console.log('Clicked "Show code" button in main document');
          } catch (error) {
            console.log(
              "Failed to click button in main document:",
              error.message
            );
          }
        });

        return clickedCount;
      });

      // Wait for any animations or content loading after clicking
      if (mainDocButtonsClicked > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      // Also try to find and click "Show code" buttons in the iframe
      const iframeButtonsClicked = await this.page.evaluate(() => {
        const iframe = document.querySelector("#storybook-preview-iframe");
        if (!iframe) {
          console.log("No iframe found for 'Show code' button search");
          return 0;
        }

        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;
        if (!iframeDoc) {
          console.log(
            "Cannot access iframe content for 'Show code' button search"
          );
          return 0;
        }

        const showCodeButtons = Array.from(
          iframeDoc.querySelectorAll('button, [role="button"], .btn, .button')
        ).filter((button) => {
          const text = button.textContent?.trim().toLowerCase();
          return text === "show code" || text.includes("show code");
        });

        console.log(
          `Found ${showCodeButtons.length} 'Show code' buttons in iframe`
        );

        let clickedCount = 0;
        showCodeButtons.forEach((button) => {
          try {
            button.click();
            clickedCount++;
            console.log('Clicked "Show code" button in iframe');
          } catch (error) {
            console.log("Failed to click button in iframe:", error.message);
          }
        });

        return clickedCount;
      });

      // Wait for any animations or content loading after clicking iframe buttons
      if (iframeButtonsClicked > 0) {
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }

      const totalClicked = mainDocButtonsClicked + iframeButtonsClicked;
      if (totalClicked > 0) {
        console.log(
          `✅ Successfully clicked ${totalClicked} 'Show code' button(s)`
        );
      } else {
        console.log("ℹ️  No 'Show code' buttons found on this page");
      }
    } catch (error) {
      console.log(
        "⚠️  Error while handling 'Show code' buttons:",
        error.message
      );
    }
  }

  async crawlAllPages() {
    console.log("🕷️  Starting to crawl all documentation pages...");

    const docElements = await this.findDocPages();

    console.log(`📊 Total pages to crawl: ${docElements.length}`);

    // Initialize the markdown file
    await this.initializeMarkdownFile();

    // Re-enable page crawling
    console.log("\n🚀 Starting page crawling...");

    // Crawl each page
    for (let i = 0; i < docElements.length; i++) {
      const docElement = docElements[i];
      console.log(
        `\n[${i + 1}/${docElements.length}] Processing: ${docElement.title}`
      );

      const docContent = await this.extractPageContent(docElement);
      if (docContent) {
        // Write content immediately to file
        await this.appendDocumentToFile(docContent);
        this.allDocs.push(docContent);
      }

      // Add a small delay to be respectful to the server
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }

    // Finalize the file
    await this.finalizeMarkdownFile();
  }

  async initializeMarkdownFile() {
    const header = `# Lib Vue Components Documentation

Generated on: ${new Date().toISOString()}

---

`;
    await fs.writeFile("doc.llm.md", header, "utf8");
    console.log("📝 Initialized markdown file");
  }

  async appendDocumentToFile(doc) {
    const content = `## ${doc.title}\n\n${doc.content}\n\n---\n\n`;
    await fs.appendFile("doc.llm.md", content, "utf8");
  }

  async finalizeMarkdownFile() {
    const stats = await fs.stat("doc.llm.md");
    console.log(`✅ Documentation written to: doc.llm.md`);
    console.log(`📊 Total content length: ${stats.size} characters`);
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log("🔒 Browser closed");
    }
  }

  async run() {
    try {
      await this.init();
      await this.navigateToStorybook();
      await this.crawlAllPages();
      console.log("\n🎉 Documentation generation completed successfully!");
    } catch (error) {
      console.error("❌ Error during documentation generation:", error);
    } finally {
      await this.cleanup();
    }
  }
}

// Main execution
async function main() {
  const args = process.argv.slice(2);
  const baseUrl = args[0] || "http://localhost:6006";

  // Parse options
  const options = {};
  if (args.includes("--text-only")) {
    options.outputFormat = "text";
  } else if (args.includes("--markdown")) {
    options.outputFormat = "markdown";
  }

  console.log("🤖 Lib Vue Components - LLM Documentation Generator");
  console.log(`🎯 Target URL: ${baseUrl}`);
  console.log(`📝 Output Format: ${options.outputFormat || "markdown"}`);
  console.log("");

  const generator = new DocGenerator(baseUrl, options);
  await generator.run();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default DocGenerator;
