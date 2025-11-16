import type { TestRunnerConfig } from "@storybook/test-runner";

const config: TestRunnerConfig = {
  async postVisit(page, context) {
    // Disable snapshots for all components to avoid timing and state issues
    // Snapshots are taken before play functions execute, causing mismatches
    // with interactive components like Select, Dropdown, etc.
    // If you need snapshots in the future, consider taking them after play functions
    // or only for static, non-interactive components
  },
};

export default config;
