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
    totalItems: { type: Number, default: 0 },
    itemsPerPage: { type: Number, default: 10 },
  },
  setup(props) {
    const currentPage = ref(props.initialPage);

    return {
      currentPage,
      totalPages: props.totalPages,
      totalItems: props.totalItems,
      itemsPerPage: props.itemsPerPage,
    };
  },
  template: `
    <div>
      <p>Current Page: {{ currentPage }}</p>
      <Pagination
        v-model="currentPage"
        :totalPages="totalPages"
        :totalItems="totalItems"
        :itemsPerPage="itemsPerPage"
      />
    </div>
  `,
});

/**
 * The Pagination component provides a simple and intuitive way to navigate through paginated content.
 * It displays the current page number and total pages, with Prev/Next buttons for navigation.
 *
 * The component can calculate total pages from server response data (totalItems)
 * or use a directly provided totalPages value.
 */
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
      description:
        "Total number of pages (optional if totalItems and itemsPerPage are provided)",
    },
    totalItems: {
      control: { type: "number", min: 0 },
      description: "Total number of items from server response",
    },
    itemsPerPage: {
      control: { type: "number", min: 1 },
      description: "Number of items per page",
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
              :totalItems="serverResponse.total"
              :itemsPerPage="10"
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
 * Pagination with calculation from server response data
 */
export const ServerPagination: Story = {
  args: {
    initialPage: 1,
    totalItems: 87,
    itemsPerPage: 10,
  },
};

/**
 * Pagination on middle page
 */
export const MiddlePage: Story = {
  args: {
    initialPage: 3,
    totalItems: 50,
    itemsPerPage: 10,
  },
};

/**
 * Pagination on last page
 */
export const LastPage: Story = {
  args: {
    initialPage: 9,
    totalItems: 87,
    itemsPerPage: 10,
  },
};

/**
 * Single page pagination (when there are fewer items than itemsPerPage)
 */
export const SinglePage: Story = {
  args: {
    initialPage: 1,
    totalItems: 8,
    itemsPerPage: 10,
  },
};
