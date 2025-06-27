import type { Meta, StoryObj } from "@storybook/vue3";
import Avatar from "./Avatar.vue";

const meta = {
  title: "Elements/Avatar",
  component: Avatar,
  tags: ["autodocs"],
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
};

// Online Status Avatar
export const WithOnlineStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "online",
  },
};

// Offline Status Avatar
export const WithOfflineStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "offline",
  },
};

// Away Status Avatar
export const WithAwayStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "away",
  },
};

// Busy Status Avatar
export const WithBusyStatus: Story = {
  args: {
    ...Default.args,
    showStatus: true,
    status: "busy",
  },
};

// Square Avatar (No Border Radius)
export const SquareAvatar: Story = {
  args: {
    ...Default.args,
    rounded: "none",
  },
};

// Slightly Rounded Avatar
export const SlightlyRoundedAvatar: Story = {
  args: {
    ...Default.args,
    rounded: "sm",
  },
};

// Fully Rounded Avatar
export const FullyRoundedAvatar: Story = {
  args: {
    ...Default.args,
    rounded: "full",
  },
};
