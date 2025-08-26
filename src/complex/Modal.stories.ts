import type { Meta, StoryObj } from "@storybook/vue3";

import Modal from "./Modal.vue";
import Button from "../elements/Button.vue";

const modalDescription = `
A flexible dialog for confirmations, forms, and rich content. Provides slots for trigger, title, default content, and footer; supports sizes, vertical alignment, and animations.

## Features
- Sizes: sm, md, lg, xl, full; center/top/bottom positioning
- Animations: fade, slide, rotate, zoom (and none)
- Persistent and prevent-close modes; optional close button hiding
- Custom content and footer slots; content class passthrough

## Accessibility
- Focus trapping and ESC/overlay behaviors configurable via props
- Ensure meaningful titles and keyboard operability of controls.

## Usage
Use for tasks that require focused attention. Keep content concise; avoid nesting modals.
`;
const meta = {
  title: "Complex/Modal",
  component: Modal,
  tags: ["autodocs"],
  parameters: {
    docs: {
      description: {
        component: modalDescription,
      },
      source: {
        type: "code",
      },
    },
    layout: "centered",
  },
  argTypes: {
    modelValue: { control: "boolean" },
    title: { control: "text" },
    triggerLabel: { control: "text" },
    size: {
      control: "inline-radio",
      options: ["sm", "md", "lg", "xl", "full"],
    },
    animation: {
      control: "inline-radio",
      options: [
        "fade",
        "slideDown",
        "slideUp",
        "fadeLeft",
        "fadeRight",
        "rotateLeft",
        "zoomIn",
        "none",
      ],
    },
    hideClose: { control: "boolean" },
    persistent: { control: "boolean" },
    preventClose: { control: "boolean" },
    contentClass: { control: "text" },
    verticalPosition: {
      control: "inline-radio",
      options: ["top", "center", "bottom"],
    },
  },
  args: {
    modelValue: false,
    title: "Modal Title",
    triggerLabel: "Open Modal",
    size: "md",
    animation: "fade",
    hideClose: false,
    persistent: false,
    preventClose: false,
    contentClass: "",
    verticalPosition: "center",
  },
  decorators: [
    () => ({
      template: '<div class="w-[400px] flex justify-center"><story /></div>',
    }),
  ],
} satisfies Meta<typeof Modal>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default modal story
export const Default: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">Default Modal Content</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This is a basic modal with default settings. You can customize the content, size, and behavior.
            </p>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" @click="toggleModal(false)">Cancel</Button>
              <Button variant="primary" @click="toggleModal(false)">Confirm</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
};

// Modal with custom trigger
export const CustomTrigger: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #trigger="{ toggleModal }">
          <Button variant="primary" size="lg" @click="toggleModal(true)">
            🚀 Launch Modal
          </Button>
        </template>
        
        <template #default="{ toggleModal }">
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">Custom Trigger</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This modal uses a custom trigger button instead of the default one.
            </p>
            <Button variant="primary" @click="toggleModal(false)">Close</Button>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    title: "Custom Trigger Modal",
  },
};

// Modal with custom title
export const WithTitle: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This modal has a custom title in the header area.
            </p>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" @click="toggleModal(false)">Cancel</Button>
              <Button variant="primary" @click="toggleModal(false)">Save Changes</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    title: "Custom Modal Title",
  },
};

// Modal with custom title slot
export const WithTitleSlot: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #title>
          <div class="flex items-center space-x-2">
            <span class="text-2xl">🎨</span>
            <span>Custom Title Slot</span>
            <span class="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">New</span>
          </div>
        </template>
        
        <template #default="{ toggleModal }">
          <div class="text-center">
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This modal demonstrates the title slot functionality. You can add custom content, icons, and styling to the title area.
            </p>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" @click="toggleModal(false)">Cancel</Button>
              <Button variant="primary" @click="toggleModal(false)">Save</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    // Don't set title prop when using title slot
  },
};

// Persistent modal story
export const Persistent: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4 text-orange-600">⚠️ Important Notice</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This is a persistent modal. It won't close when clicking outside or pressing escape.
              You must use the action buttons to close it.
            </p>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" @click="toggleModal(false)">Dismiss</Button>
              <Button variant="primary" @click="toggleModal(false)">Acknowledge</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    persistent: true,
    title: "Persistent Modal",
  },
};

// Large size modal story
export const CustomSize: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div>
            <h3 class="text-lg font-medium mb-4">Large Modal</h3>
            <div class="grid grid-cols-2 gap-4 mb-6">
              <div>
                <label class="block text-sm font-medium mb-2">First Name</label>
                <input type="text" class="form-input w-full" placeholder="Enter first name" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Last Name</label>
                <input type="text" class="form-input w-full" placeholder="Enter last name" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input type="email" class="form-input w-full" placeholder="Enter email" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Phone</label>
                <input type="tel" class="form-input w-full" placeholder="Enter phone" />
              </div>
            </div>
            <div class="mb-6">
              <label class="block text-sm font-medium mb-2">Message</label>
              <textarea class="form-textarea w-full" rows="4" placeholder="Enter your message"></textarea>
            </div>
            <div class="flex justify-end space-x-2">
              <Button variant="outline" @click="toggleModal(false)">Cancel</Button>
              <Button variant="primary" @click="toggleModal(false)">Submit</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    size: "lg",
    title: "Contact Form",
  },
};

// Custom animation story
export const CustomAnimation: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div class="text-center">
            <div class="text-6xl mb-4">🎉</div>
            <h3 class="text-lg font-medium mb-4">Success!</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This modal uses a zoom-in animation effect. Try opening it again to see the animation.
            </p>
            <Button variant="primary" @click="toggleModal(false)">Awesome!</Button>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    animation: "zoomIn",
    title: "Animated Modal",
  },
};

// Modal with footer slot
export const WithFooter: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div>
            <p class="text-gray-600 dark:text-gray-400 mb-4">
              This modal demonstrates the footer slot functionality. The footer appears at the bottom with a border separator.
            </p>
            <div class="space-y-4">
              <div>
                <label class="block text-sm font-medium mb-2">Name</label>
                <input type="text" class="form-input w-full" placeholder="Enter your name" />
              </div>
              <div>
                <label class="block text-sm font-medium mb-2">Email</label>
                <input type="email" class="form-input w-full" placeholder="Enter your email" />
              </div>
            </div>
          </div>
        </template>
        
        <template #footer="{ toggleModal }">
          <div class="flex justify-between">
            <Button variant="outline" @click="toggleModal(false)">Cancel</Button>
            <div class="space-x-2 flex">
              <Button variant="outline">Save Draft</Button>
              <Button variant="primary" @click="toggleModal(false)">Submit</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    title: "Modal with Footer",
  },
};

// Modal without close button
export const NoCloseButton: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div class="text-center">
            <h3 class="text-lg font-medium mb-4">No Close Button</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              This modal has the close button hidden. You must use the action buttons to close it.
            </p>
            <div class="flex justify-center space-x-2">
              <Button variant="outline" @click="toggleModal(false)">Cancel</Button>
              <Button variant="primary" @click="toggleModal(false)">Proceed</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    hideClose: true,
    title: "Confirmation Required",
  },
};

// Small modal story
export const SmallSize: Story = {
  render: (args) => ({
    components: { Modal, Button },
    setup() {
      return { args };
    },
    template: `
      <Modal v-bind="args">
        <template #default="{ toggleModal }">
          <div class="text-center">
            <div class="text-4xl mb-4">❓</div>
            <h3 class="text-lg font-medium mb-4">Confirm Action</h3>
            <p class="text-gray-600 dark:text-gray-400 mb-6">
              Are you sure you want to proceed?
            </p>
            <div class="flex justify-center space-x-2">
              <Button variant="outline" size="sm" @click="toggleModal(false)">No</Button>
              <Button variant="danger" size="sm" @click="toggleModal(false)">Yes, Delete</Button>
            </div>
          </div>
        </template>
      </Modal>
    `,
  }),
  args: {
    size: "sm",
    triggerLabel: "Delete Item",
  },
};
