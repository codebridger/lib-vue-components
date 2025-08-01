import type { TestRunnerConfig } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // the #storybook-root element wraps the story. In Storybook 6.x, the selector is #root
    const elementHandler = await page.$("#storybook-root");
    const innerHTML = await elementHandler?.innerHTML();

    // Disable snapshots for components with dynamic content
    const dynamicComponents = [
      "Elements/Dropdown", // Has animations and dynamic positioning
      "Elements/Tooltip", // Has dynamic positioning
      "Elements/Tabs", // Has dynamic content switching
      "Complex/Modal", // Has animations
    ];

    const shouldCreateSnapshot = !dynamicComponents.some((component) =>
      context.title?.startsWith(component)
    );

    if (shouldCreateSnapshot) {
      // @ts-expect-error
      expect(innerHTML).toMatchSnapshot();
    }
  },
};

export default config;
