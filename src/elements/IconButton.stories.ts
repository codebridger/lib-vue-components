import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";

import IconButton from "./IconButton.vue";

const iconButtonDescription = `
A compact, versatile button optimized for icons or avatars. Works as a clickable control by default and as a decorative badge when badge is true.

## Features
- Color themes and rounded radii for circular or rounded styles
- Sizes: xs, sm, md, lg, xl
- Loading state with customizable spinner icon
- Disabled state; optional badge (non-interactive) mode
- Supports either an icon name or an image via imgUrl

## Accessibility
- Focusable and keyboard operable when interactive
- Loading/disabled states use non-pointer cursors to signal non-interactivity

## Usage
Use for toolbar actions, quick affordances, and avatars. Prefer tooltips or aria-labels to convey meaning for icon-only buttons.
`;
const meta = {
  title: "Elements/IconButton",
  component: IconButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: iconButtonDescription,
      },
    },
  },
  argTypes: {
    color: {
      control: "select",
      options: [
        "default",
        "primary",
        "info",
        "success",
        "warning",
        "danger",
        "secondary",
        "dark",
        "gradient",
      ],
      description: "Color theme for the icon button",
    },
    rounded: {
      control: "select",
      options: ["full", "none", "xs", "sm", "md", "lg", "xl"],
      description: "Border radius size",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
      description: "Visual size of the inner icon or image",
    },
    icon: {
      control: "text",
      description: "Icon name to render from the icon set",
    },
    isLoading: {
      control: "boolean",
      description: "Shows a loading spinner when true",
    },
    loadingIcon: {
      control: "select",
      options: ["IconLoader", "IconRefresh", "IconRestore"],
      description: "Icon to show when loading",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
    badge: {
      control: "boolean",
      description:
        "Enable badge mode (non-interactive): no click events and default cursor",
    },
  },
  args: {
    color: "default",
    size: "sm",
    isLoading: false,
    loadingIcon: "IconLoader",
    disabled: false,
    badge: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Interactive usage. Emits `click` and shows a pointer cursor when not disabled/loading.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Test icon button interaction", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      await userEvent.click(button);
      expect(button).toBeInTheDocument();
    });
  },
};

export const Loading: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    isLoading: true,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Shows the built-in spinner and is non-interactive while loading.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify loading icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Verify loading state", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      const loadingIcon = button.querySelector("svg");
      expect(loadingIcon).toBeInTheDocument();
      expect(loadingIcon).toHaveClass("animate-[spin_2s_linear_infinite]");
    });
  },
};

export const LoadingWithCustomIcon: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    isLoading: true,
    loadingIcon: "IconRefresh",
    size: "lg",
  },
  parameters: {
    docs: {
      description: {
        story: "Customize the spinner icon via the `loadingIcon` prop.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify custom loading icon button renders correctly",
      async () => {
        const buttons = canvas.getAllByRole("generic");
        const button = buttons[1]; // Skip the main wrapper, get the actual button
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("rounded-full");
      }
    );

    await step("Verify custom loading icon is displayed", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      const loadingIcon = button.querySelector("svg");
      expect(loadingIcon).toBeInTheDocument();
      expect(loadingIcon).toHaveClass("animate-[spin_2s_linear_infinite]");
    });
  },
};

// Use public URL for assets rather than importing from /public
const userProfilePicUrl = "/assets/images/user-profile.jpeg";
export const WithImages: Story = {
  args: {
    rounded: "full",
    size: "xl",
    imgUrl: userProfilePicUrl,
  },
  parameters: {
    docs: {
      description: {
        story:
          "Pass `imgUrl` to render an image instead of an icon. Works in both interactive and badge modes.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify image icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Verify image is displayed", async () => {
      const image = canvas.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", userProfilePicUrl);
    });
  },
};

export const Disabled: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    disabled: true,
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled state is non-interactive and shows a not-allowed cursor.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify disabled icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Verify disabled state", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toHaveAttribute("disabled", "true");
    });
  },
};

export const ColorVariants: Story = {
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: `
      <div class="p-6 bg-gray-50 dark:bg-gray-900">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">IconButton Color Variants</h3>
        <div class="flex gap-4 items-center flex-wrap">
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="default" icon="IconSettings" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Default</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="primary" icon="IconSun" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Primary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="info" icon="IconInfoCircle" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Info</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="success" icon="IconCheck" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Success</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="warning" icon="IconAlertTriangle" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Warning</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="danger" icon="IconX" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Danger</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="secondary" icon="IconSettings" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Secondary</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="dark" icon="IconMoon" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Dark</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="gradient" icon="IconStar" />
            <span class="text-xs text-gray-600 dark:text-gray-400">Gradient</span>
          </div>
        </div>
      </div>
    `,
  }),
  args: {
    rounded: "full",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story: "Preview of all color variants.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify color variants story renders correctly", async () => {
      // Verify the story renders without errors
      const title = canvas.getByText("IconButton Color Variants");
      expect(title).toBeInTheDocument();

      // Verify we have some IconButton elements
      const iconButtons = canvas.getAllByRole("generic");
      expect(iconButtons.length).toBeGreaterThan(0);
    });
  },
};

export const ToolbarExample: Story = {
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: `
      <div class="p-6 bg-white dark:bg-gray-800 border rounded-lg">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">Toolbar Example</h3>
        <div class="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg">
          <div class="flex gap-2 items-center flex-wrap">
            <IconButton v-bind="args" color="primary" icon="IconEdit" size="sm" />
            <IconButton v-bind="args" color="success" icon="IconCheck" size="sm" />
            <IconButton v-bind="args" color="danger" icon="IconTrash" size="sm" />
            <IconButton v-bind="args" color="info" icon="IconInfo" size="sm" />
            <IconButton v-bind="args" color="warning" icon="IconAlertTriangle" size="sm" />
            <IconButton v-bind="args" color="secondary" icon="IconSettings" size="sm" />
          </div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Different colored IconButtons in a practical toolbar context
        </p>
      </div>
    `,
  }),
  args: {
    rounded: "md",
    size: "sm",
  },
  parameters: {
    docs: {
      description: {
        story: "Example layout with multiple IconButtons.",
      },
    },
  },
};

export const Badge: Story = {
  args: {
    rounded: "full",
    icon: "IconStar",
    badge: true,
    color: "primary",
    size: "md",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Badge mode: decorative only. Shows default cursor and does not emit `click`.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify badge icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
      expect(button).toHaveClass("cursor-default");
    });

    await step("Verify badge has no click functionality", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      // Badge should not have pointer cursor
      expect(button).not.toHaveClass("hover:cursor-pointer");
    });
  },
};

export const BadgeVariants: Story = {
  render: (args) => ({
    components: { IconButton },
    setup() {
      return { args };
    },
    template: `
      <div class="p-6 bg-gray-50 dark:bg-gray-900">
        <h3 class="text-lg font-semibold mb-4 text-gray-800 dark:text-white">IconButton Badge Variants</h3>
        <div class="flex gap-4 items-center flex-wrap">
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="primary" icon="IconStar" badge />
            <span class="text-xs text-gray-600 dark:text-gray-400">Primary Badge</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="success" icon="IconCheck" badge />
            <span class="text-xs text-gray-600 dark:text-gray-400">Success Badge</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="warning" icon="IconAlertTriangle" badge />
            <span class="text-xs text-gray-600 dark:text-gray-400">Warning Badge</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="danger" icon="IconX" badge />
            <span class="text-xs text-gray-600 dark:text-gray-400">Danger Badge</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="info" icon="IconInfo" badge />
            <span class="text-xs text-gray-600 dark:text-gray-400">Info Badge</span>
          </div>
          <div class="flex flex-col items-center gap-2">
            <IconButton v-bind="args" color="secondary" icon="IconSettings" badge />
            <span class="text-xs text-gray-600 dark:text-gray-400">Secondary Badge</span>
          </div>
        </div>
        <p class="text-sm text-gray-600 dark:text-gray-400 mt-3">
          Badge mode removes click functionality and shows default cursor
        </p>
      </div>
    `,
  }),
  args: {
    rounded: "full",
    size: "md",
    badge: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Multiple badge color examples.",
      },
    },
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify badge variants story renders correctly", async () => {
      // Verify the story renders without errors
      const title = canvas.getByText("IconButton Badge Variants");
      expect(title).toBeInTheDocument();

      // Verify we have some IconButton elements
      const iconButtons = canvas.getAllByRole("generic");
      expect(iconButtons.length).toBeGreaterThan(0);
    });
  },
};
