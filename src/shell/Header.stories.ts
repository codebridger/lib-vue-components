import { useAppStore } from "@/stores";
import Header from "./Header.vue";
import { Meta, StoryFn } from "@storybook/vue3";

export default {
  title: "Shell/Header",
  component: Header,
  tags: [
    // "autodocs"
  ],
  parameters: {
    docs: {
      disable: true,
    },
  },
} as Meta<typeof Header>;

const Template: StoryFn<typeof Header> = (args) => ({
  components: { Header },
  setup() {
    useAppStore().toggleMenuStyle("horizontal");
    return { args };
  },
  template: "<Header />",
});

// export const DefaultHeader = Template.bind({});
// DefaultHeader.args = {};
