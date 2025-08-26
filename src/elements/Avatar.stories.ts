import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within } from "@storybook/test";
import Avatar from "./Avatar.vue";

const avatarDescription = `
Displays a user image or placeholder with configurable size and rounding. Optional presence indicator conveys online/offline state.

## Features
- Sizes: xs, sm, md, lg
- Rounding: none → full
- Optional status dot (online, offline, away, busy)
- Dark mode and RTL-aware spacing

## Accessibility
- Always provide a meaningful alt describing the person/content shown.

## Usage
Use in lists, headers, and cards. Combine with AvatarGroup to show multiple participants.
`;
const meta = {
  title: "Elements/Avatar",
  component: Avatar,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: avatarDescription,
      },
    },
  },
  argTypes: {
    src: {
      control: "text",
      description: "Image source URL for the avatar",
      defaultValue:
        "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
    },
    alt: {
      control: "text",
      description: "Alternative text for accessibility",
    },
    rounded: {
      control: "select",
      options: ["none", "xs", "sm", "md", "lg", "xl", "full"],
      description: "Border radius of the avatar",
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg"],
      description: "Size of the avatar",
    },
    showStatus: {
      control: "boolean",
      description: "Whether to display the status indicator",
    },
    status: {
      control: "select",
      options: ["online", "offline", "away", "busy"],
      description: "Current status of the user",
    },
    disabled: {
      control: "boolean",
      description: "Whether the avatar is in a disabled state",
    },
  },
  args: {
    rounded: "full",
    size: "lg",
    showStatus: true,
    status: "online",
    disabled: false,
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof meta>;

// Default Avatar
export const Default: Story = {
  args: {
    src: "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
    alt: "User avatar",
    rounded: "full",
    size: "lg",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify avatar renders correctly", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveAttribute(
        "src",
        "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg"
      );
      expect(avatar).toHaveClass("rounded-full");
    });

    await step("Verify avatar container has correct classes", async () => {
      const avatarContainer = canvas.getByAltText("User avatar").parentElement;
      expect(avatarContainer).toHaveClass(
        "overflow-hidden",
        "relative",
        "flex",
        "justify-center",
        "items-center"
      );
    });
  },
};

// Online Status Avatar
export const WithOnlineStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "online",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify avatar with online status", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();

      const statusIndicator = avatar.parentElement?.querySelector("span");
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveClass("bg-success");
    });
  },
};

// Offline Status Avatar
export const WithOfflineStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "offline",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify avatar with offline status", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();

      const statusIndicator = avatar.parentElement?.querySelector("span");
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveClass("bg-secondary");
    });
  },
};

// Away Status Avatar
export const WithAwayStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "away",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify avatar with away status", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();

      const statusIndicator = avatar.parentElement?.querySelector("span");
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveClass("bg-warning");
    });
  },
};

// Busy Status Avatar
export const WithBusyStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "busy",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify avatar with busy status", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();

      const statusIndicator = avatar.parentElement?.querySelector("span");
      expect(statusIndicator).toBeInTheDocument();
      expect(statusIndicator).toHaveClass("bg-danger");
    });
  },
};

// Square Avatar (No Border Radius)
export const SquareAvatar: Story = {
  args: {
    ...Default.args,
    rounded: "none",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify square avatar", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("rounded-none");
    });
  },
};

// Slightly Rounded Avatar
export const SlightlyRoundedAvatar: Story = {
  args: {
    ...Default.args,
    rounded: "sm",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify slightly rounded avatar", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("rounded-sm");
    });
  },
};

// Fully Rounded Avatar
export const FullyRoundedAvatar: Story = {
  args: {
    ...Default.args,
    rounded: "full",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify fully rounded avatar", async () => {
      const avatar = canvas.getByAltText("User avatar");
      expect(avatar).toBeInTheDocument();
      expect(avatar).toHaveClass("rounded-full");
    });
  },
};
