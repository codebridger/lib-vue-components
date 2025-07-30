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
          const language = code.className?.match(/language-(\w+)/)?.[1] || "";
          return `\n\`\`\`${language}\n${code.textContent}\n\`\`\`\n\n`;
        }
        return `\n\`\`\`\n${content}\n\`\`\`\n\n`;
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
        // Get total count of all elements
        const allElements = Array.from(
          document.querySelectorAll("[data-item-id]")
        );
        console.log("📊 Total elements with data-item-id:", allElements.length);

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

      // Extract content from the iframe
      const content = await this.page.evaluate((dataItemId) => {
        // First try to find the iframe
        const iframe = document.querySelector("#storybook-preview-iframe");

        if (!iframe) {
          console.log("Storybook preview iframe not found");
          return "";
        }

        // Get the iframe document
        const iframeDoc =
          iframe.contentDocument || iframe.contentWindow.document;

        if (!iframeDoc) {
          console.log("Cannot access iframe content");
          return "";
        }

        console.log("Found iframe, extracting content from iframe document");

        // Try to find content within the iframe
        const contentSelectors = [
          ".docblock",
          ".docblock-source",
          ".markdown",
          "article",
          "main",
          ".docs-story",
          ".storybook-docs",
          '[data-testid="story-panel"]',
          "body",
        ];

        let contentElement = null;
        for (const selector of contentSelectors) {
          contentElement = iframeDoc.querySelector(selector);
          if (contentElement) {
            console.log(`Found content with selector: ${selector} in iframe`);
            break;
          }
        }

        // If no content found in iframe, fall back to main document
        if (!contentElement) {
          // Try to find content in the main document
          for (const selector of contentSelectors) {
            contentElement = document.querySelector(selector);
            if (contentElement) {
              console.log(
                `Found content with selector: ${selector} in main document`
              );
              break;
            }
          }
        }

        // Return the HTML content for processing outside
        if (contentElement) {
          const result = contentElement.outerHTML;
          console.log(`Extracted content length: ${result.length} characters`);
          return result;
        }

        return "";
      }, docElement.dataItemId);

      // Convert HTML to markdown or text based on options
      let finalContent = "";
      if (this.options.outputFormat === "text") {
        // Extract text-only content
        const tempDiv = document.createElement("div");
        tempDiv.innerHTML = content;
        const allText = tempDiv.textContent || tempDiv.innerText || "";
        const lines = allText
          .split("\n")
          .map((line) => line.trim())
          .filter((line) => line.length > 0);
        finalContent = lines.join("\n\n");
      } else {
        // Convert to markdown using turndown service
        try {
          finalContent = this.turndownService.turndown(content);
        } catch (error) {
          console.log(
            "Error converting to markdown, falling back to text extraction"
          );
          // Fallback to text extraction if markdown conversion fails
          const tempDiv = document.createElement("div");
          tempDiv.innerHTML = content;
          const allText = tempDiv.textContent || tempDiv.innerText || "";
          const lines = allText
            .split("\n")
            .map((line) => line.trim())
            .filter((line) => line.length > 0);
          finalContent = lines.join("\n\n");
        }
      }

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

## 📚 Documentation

`;
    await fs.writeFile("doc.llm.md", header, "utf8");
    console.log("📝 Initialized markdown file");
  }

  async appendDocumentToFile(doc) {
    const content = `### ${doc.title}\n\n${doc.content}\n\n---\n\n`;
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
