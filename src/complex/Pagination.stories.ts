import type { Meta, StoryObj } from "@storybook/vue3";
import { ref, defineComponent } from "vue";
import Pagination from "./Pagination.vue";

// Create a wrapper component that properly handles v-model
const PaginationWrapper = defineComponent({
  name: "PaginationWrapper",
  components: { Pagination },
  props: {
    initialPage: { type: Number, default: 1 },
    totalPages: { type: Number, default: 1 },
  },
  setup(props) {
    const currentPage = ref(props.initialPage);

    return {
      currentPage,
      totalPages: props.totalPages,
    };
  },
  template: `
    <div>
      <p>Current Page: {{ currentPage }}</p>
      <Pagination
        v-model="currentPage"
        :totalPages="totalPages"
      />
    </div>
  `,
});

const meta = {
  title: "complex/Pagination",
  component: PaginationWrapper,
  tags: ["autodocs"],
  argTypes: {
    initialPage: {
      control: { type: "number", min: 1 },
      description: "Initial page number",
    },
    totalPages: {
      control: { type: "number", min: 1 },
      description: "Total number of pages",
    },
  },
  parameters: {
    docs: {
      description: {
        component: `
          The Pagination component allows users to navigate through multiple pages of content.
          
          ## Events
          - \`update:modelValue\`: Emitted when the current page changes (for v-model support)
          - \`change-page\`: Emitted when the page changes, with the new page number as payload
          
          ## Usage
          
          \`\`\`vue
          <template>
            <Pagination
              v-model="page"
              @change-page="handlePageChange"
            />
          </template>
          
          <script setup lang="ts">
          import { ref } from 'vue';
          
          const page = ref(1);
          const handlePageChange = (newPage) => {
            // Fetch new data or update your state
          };
          </script>
          \`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof PaginationWrapper>;

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default pagination using directly provided totalPages
 */
export const Default: Story = {
  args: {
    initialPage: 1,
    totalPages: 5,
  },
};

/**
 * Pagination on last page
 */
export const LastPage: Story = {
  args: {
    initialPage: 9,
  },
};

/**
 * Single page pagination
 */
export const SinglePage: Story = {
  args: {
    initialPage: 1,
  },
};
