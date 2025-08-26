import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within } from "@storybook/test";
import AvatarGroup from "./AvatarGroup.vue";
import Avatar from "./Avatar.vue";

const avatarGroupDescription = `
# AvatarGroup Component

Groups multiple Avatar components with an overlapping layout to indicate participants or teams.

## Features
- Automatic spacing/overlap with RTL support
- Optional hover animations
- Works with any Avatar sizes and rounding

## Accessibility
- Ensure each avatar has an informative alt text; the group itself should be labeled when used as a control.

## Usage
Use to summarize membership, commenters, or assignees; link the group to a details view when appropriate.
`;
const meta: Meta<typeof AvatarGroup> = {
  title: "Elements/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    componentSubtitle: "A container component for grouping multiple avatars",
    docs: {
      description: {
        component: avatarGroupDescription,
      },
      source: {
        type: "code",
      },
    },
  },
  argTypes: {
    hoverAnimation: {
      control: "boolean",
    },
  },
  args: {
    hoverAnimation: false,
  },
};

export default meta;
type Story = StoryObj<typeof AvatarGroup>;

// Sample avatar data
const avatarImages = [
  {
    src: "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
    alt: "User 1",
  },
  {
    src: "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
    alt: "User 2",
  },
  {
    src: "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
    alt: "User 3",
  },
];

export const Default: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Standard implementation of the avatar group with three members.",
      },
    },
  },
  render: (args) => ({
    components: { AvatarGroup, Avatar },
    setup() {
      return { avatarImages, args };
    },
    template: `
      <AvatarGroup v-bind="args">
        <Avatar 
          v-for="(avatar, index) in avatarImages" 
          :key="index" 
          :src="avatar.src"
          :alt="avatar.alt"
        />
      </AvatarGroup>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify avatar group renders correctly", async () => {
      const avatarGroup = canvas.getByRole("group");
      expect(avatarGroup).toBeInTheDocument();
      expect(avatarGroup).toHaveClass("flex", "items-center");
    });

    await step("Verify all avatars are rendered", async () => {
      const avatars = canvas.getAllByAltText(/User \d/);
      expect(avatars).toHaveLength(3);

      avatars.forEach((avatar, index) => {
        expect(avatar).toBeInTheDocument();
        expect(avatar).toHaveAttribute(
          "src",
          "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg"
        );
      });
    });
  },
};

export const WithMoreAvatars: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Avatar group displaying a larger number of members to demonstrate spacing.",
      },
    },
  },
  render: (args) => ({
    components: { AvatarGroup, Avatar },
    setup() {
      const extendedAvatars = [
        ...avatarImages,
        {
          src: "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
          alt: "User 4",
        },
        {
          src: "https://html.vristo.sbthemes.com/assets/images/profile-12.jpeg",
          alt: "User 5",
        },
      ];
      return { avatarImages: extendedAvatars, args };
    },
    template: `
      <AvatarGroup v-bind="args">
        <Avatar 
          v-for="(avatar, index) in avatarImages" 
          :key="index" 
          :src="avatar.src"
          :alt="avatar.alt"
        />
      </AvatarGroup>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify extended avatar group renders correctly", async () => {
      const avatarGroup = canvas.getByRole("group");
      expect(avatarGroup).toBeInTheDocument();
    });

    await step("Verify all 5 avatars are rendered", async () => {
      const avatars = canvas.getAllByAltText(/User \d/);
      expect(avatars).toHaveLength(5);
    });
  },
};

export const AnimateX: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatar group with Animate X.",
      },
    },
  },
  args: {
    hoverAnimation: true,
  },
  render: (args) => ({
    components: { AvatarGroup, Avatar },
    setup() {
      return { avatarImages, args };
    },
    template: `
      <div>
        <AvatarGroup v-bind="args">
          <Avatar
            v-for="(avatar, index) in avatarImages" 
            :key="index" 
            :src="avatar.src"
            :alt="avatar.alt"
          />
        </AvatarGroup>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify animated avatar group renders correctly", async () => {
      const avatarGroup = canvas.getByRole("group");
      expect(avatarGroup).toBeInTheDocument();
    });

    await step("Verify hover animation classes are applied", async () => {
      const avatars = canvas.getAllByAltText(/User \d/);
      avatars.forEach((avatar) => {
        const avatarContainer = avatar.parentElement;
        expect(avatarContainer).toHaveClass(
          "transition-all",
          "duration-300",
          "hover:translate-x-2"
        );
      });
    });
  },
};

export const RTLSupport: Story = {
  parameters: {
    docs: {
      description: {
        story: "Avatar group with RTL (Right-to-Left) layout support enabled.",
      },
    },
  },
  render: (args) => ({
    components: { AvatarGroup, Avatar },
    setup() {
      return { avatarImages, args };
    },
    template: `
      <div dir="rtl">
        <AvatarGroup v-bind="args">
          <Avatar 
            v-for="(avatar, index) in avatarImages" 
            :key="index" 
            :src="avatar.src"
            :alt="avatar.alt"
          />
        </AvatarGroup>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify RTL avatar group renders correctly", async () => {
      const rtlContainer = canvas.getByRole("group").parentElement;
      expect(rtlContainer).toHaveAttribute("dir", "rtl");

      const avatarGroup = canvas.getByRole("group");
      expect(avatarGroup).toBeInTheDocument();
    });

    await step("Verify all avatars are rendered in RTL context", async () => {
      const avatars = canvas.getAllByAltText(/User \d/);
      expect(avatars).toHaveLength(3);
    });
  },
};
