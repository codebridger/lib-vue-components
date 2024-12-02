import type { Meta, StoryObj } from "@storybook/vue3";
import AvatarGroup from "./AvatarGroup.vue";
import Avatar from "./Avatar.vue";

const meta: Meta<typeof AvatarGroup> = {
  title: "Elements/AvatarGroup",
  component: AvatarGroup,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    componentSubtitle: "A container component for grouping multiple avatars",
    docs: {
      description: {
        component:
          "The AvatarGroup component provides a container for displaying multiple avatars with an overlapping effect. It handles proper spacing and RTL support automatically.",
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
};
