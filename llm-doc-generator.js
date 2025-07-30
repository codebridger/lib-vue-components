#!/usr/bin/env node

import puppeteer from "puppeteer";
import fs from "fs/promises";

class DocGenerator {
  constructor(baseUrl = "http://localhost:6006") {
    this.baseUrl = baseUrl;
    this.browser = null;
    this.page = null;
    this.allDocs = [];
    this.visitedUrls = new Set();
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

        expandAllButtons.forEach((button, index) => {
          console.log(`Clicking expand-all button ${index + 1}`);
          button.click();
        });
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

        // Click on each expandable item to expand it
        expandableItems.forEach((item, index) => {
          const dataItemId = item.getAttribute("data-item-id");
          console.log(
            `Clicking on expandable item ${index + 1}: ${dataItemId}`
          );
          item.click();
        });
      });

      // Wait a bit more for the expansion to complete
      await new Promise((resolve) => setTimeout(resolve, 2000));

      // Find all elements with data-item-id ending in --docs
      const docElements = await this.page.evaluate(() => {
        // Debug: Log all data-item-id elements first
        const allElements = Array.from(
          document.querySelectorAll("[data-item-id]")
        );
        console.log("All data-item-id elements found:", allElements.length);
        allElements.forEach((el) => {
          console.log("data-item-id:", el.getAttribute("data-item-id"));
        });

        // Get all elements with data-item-id ending in --docs that have links
        const allElementsWithLinks = Array.from(
          document.querySelectorAll('[data-item-id$="--docs"]')
        ).filter((el) => {
          const link = el.querySelector("a");
          return link && link.href;
        });

        console.log(
          "Elements with data-item-id that have links:",
          allElementsWithLinks.length
        );

        // Separate docs from stories
        const docsElements = allElementsWithLinks.filter((el) => {
          const dataItemId = el.getAttribute("data-item-id");
          return dataItemId && dataItemId.includes("--docs");
        });

        const storyElements = allElementsWithLinks.filter((el) => {
          const dataItemId = el.getAttribute("data-item-id");
          return dataItemId && !dataItemId.includes("--docs");
        });

        console.log("Documentation elements (--docs):", docsElements.length);
        console.log("Story elements (non-docs):", storyElements.length);

        // Also look for any <a> tags that might be story links
        const allLinks = Array.from(
          document.querySelectorAll('a[href*="story"], a[href*="docs"]')
        );
        console.log("All links with story or docs in href:", allLinks.length);
        allLinks.forEach((link) => {
          console.log("Link href:", link.href);
        });

        // Also look for story pages (elements with data-item-id that have links but don't end with --docs)
        const additionalStoryElements = Array.from(
          document.querySelectorAll("[data-item-id]")
        ).filter((el) => {
          const link = el.querySelector("a");
          const dataItemId = el.getAttribute("data-item-id");
          return (
            link && link.href && dataItemId && !dataItemId.endsWith("--docs")
          );
        });

        console.log(
          "Additional story elements found:",
          additionalStoryElements.length
        );
        additionalStoryElements.forEach((el, index) => {
          const dataItemId = el.getAttribute("data-item-id");
          const link = el.querySelector("a");
          console.log(`Story ${index + 1}: ${dataItemId} -> ${link.href}`);
        });

        // Use all elements with links (both docs and stories)
        const elements = allElementsWithLinks.concat(additionalStoryElements);

        // Debug: Print all elements with their details
        console.log("\n🔍 All elements with data-item-id:");
        allElements.forEach((el, index) => {
          const dataItemId = el.getAttribute("data-item-id");
          const link = el.querySelector("a");
          const hasLink = link && link.href;
          const linkText = link ? link.textContent?.trim() : "No link";
          console.log(
            `  ${index + 1}. ${dataItemId} - ${linkText} ${
              hasLink ? "(has link)" : "(no link)"
            }`
          );
        });

        console.log("\n🔍 Elements with links:");
        elements.forEach((el, index) => {
          const dataItemId = el.getAttribute("data-item-id");
          const link = el.querySelector("a");
          const linkText = link.textContent?.trim() || "No text";
          console.log(
            `  ${index + 1}. ${dataItemId} - ${linkText} -> ${link.href}`
          );
        });

        return elements
          .map((element) => {
            const dataItemId = element.getAttribute("data-item-id");
            // Find the link inside this element
            const link = element.querySelector("a");

            if (link && link.href) {
              return {
                dataItemId: dataItemId,
                href: link.href,
                text:
                  link.textContent?.trim() || element.textContent?.trim() || "",
                title:
                  link.title ||
                  link.textContent?.trim() ||
                  element.textContent?.trim() ||
                  "",
              };
            }

            return null;
          })
          .filter((item) => item !== null && item.dataItemId && item.href);
      });

      console.log(`📄 Found ${docElements.length} documentation pages`);

      // Log the found elements for debugging
      docElements.forEach((item) => {
        console.log(`  - ${item.text}: ${item.dataItemId}`);
      });

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

        // Convert HTML to markdown-like format
        const convertToMarkdown = (element) => {
          let markdown = "";

          // Handle headings
          const headings = element.querySelectorAll("h1, h2, h3, h4, h5, h6");
          headings.forEach((heading) => {
            const level = parseInt(heading.tagName.charAt(1));
            const prefix = "#".repeat(level);
            markdown += `\n${prefix} ${heading.textContent.trim()}\n\n`;
          });

          // Handle paragraphs
          const paragraphs = element.querySelectorAll("p");
          paragraphs.forEach((p) => {
            const text = p.textContent.trim();
            if (text) {
              markdown += `${text}\n\n`;
            }
          });

          // Handle code blocks
          const codeBlocks = element.querySelectorAll("pre code, code");
          codeBlocks.forEach((code) => {
            const language = code.className?.match(/language-(\w+)/)?.[1] || "";
            const codeText = code.textContent.trim();
            if (codeText) {
              markdown += `\n\`\`\`${language}\n${codeText}\n\`\`\`\n\n`;
            }
          });

          // Handle lists
          const lists = element.querySelectorAll("ul, ol");
          lists.forEach((list) => {
            const items = list.querySelectorAll("li");
            items.forEach((item) => {
              const text = item.textContent.trim();
              if (text) {
                markdown += `- ${text}\n`;
              }
            });
            markdown += "\n";
          });

          // Handle tables
          const tables = element.querySelectorAll("table");
          tables.forEach((table) => {
            const rows = table.querySelectorAll("tr");
            rows.forEach((row, index) => {
              const cells = row.querySelectorAll("td, th");
              const rowContent = Array.from(cells)
                .map((cell) => cell.textContent.trim())
                .join(" | ");
              if (rowContent) {
                markdown += `| ${rowContent} |\n`;

                // Add header separator after first row
                if (index === 0) {
                  const separator = Array.from(cells)
                    .map(() => "---")
                    .join(" | ");
                  markdown += `| ${separator} |\n`;
                }
              }
            });
            markdown += "\n";
          });

          // If no structured content found, get all text
          if (!markdown.trim()) {
            const allText = element.textContent || element.innerText || "";
            const lines = allText
              .split("\n")
              .map((line) => line.trim())
              .filter((line) => line.length > 0);
            markdown = lines.join("\n\n");
          }

          return markdown.trim();
        };

        const result = convertToMarkdown(contentElement);
        console.log(`Extracted content length: ${result.length} characters`);
        return result;
      }, docElement.dataItemId);

      return {
        title: docElement.title,
        dataItemId: docElement.dataItemId,
        url: docElement.href,
        content: content,
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

    // DEBUG: Show all found elements
    console.log("\n🔍 DEBUG: Found documentation elements:");
    docElements.forEach((element, index) => {
      console.log(`  ${index + 1}. ${element.title} (${element.dataItemId})`);
    });

    // Temporarily disable page crawling for fast iteration
    console.log("\n⏸️  Page crawling disabled for fast iteration");
    return;
  }

  async generateMarkdownFile() {
    console.log("📝 Generating consolidated markdown file...");

    let markdownContent = `# Lib Vue Components Documentation

Generated on: ${new Date().toISOString()}
Total pages: ${this.allDocs.length}

---

`;

    // Add documentation
    if (this.allDocs.length > 0) {
      markdownContent += `## 📚 Documentation\n\n`;
      this.allDocs.forEach((doc) => {
        markdownContent += `### ${doc.title}\n\n`;
        markdownContent += `**Data Item ID:** ${doc.dataItemId}\n`;
        markdownContent += `**Source:** ${doc.url}\n\n`;
        markdownContent += `${doc.content}\n\n`;
        markdownContent += `---\n\n`;
      });
    }

    // Write to file
    const outputPath = "doc.llm.md";
    await fs.writeFile(outputPath, markdownContent, "utf8");
    console.log(`✅ Documentation written to: ${outputPath}`);
    console.log(
      `📊 Total content length: ${markdownContent.length} characters`
    );
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
      await this.generateMarkdownFile();
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

  console.log("🤖 Lib Vue Components - LLM Documentation Generator");
  console.log(`🎯 Target URL: ${baseUrl}`);
  console.log("");

  const generator = new DocGenerator(baseUrl);
  await generator.run();
}

// Run if called directly
if (import.meta.url === `file://${process.argv[1]}`) {
  main().catch(console.error);
}

export default DocGenerator;
