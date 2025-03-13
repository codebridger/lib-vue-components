import type { Meta, StoryObj } from "@storybook/vue3";
import Tabs from "./Tabs.vue";
import { TabItem } from "./Tabs.vue";
import { ref } from "vue";

const meta = {
  title: "Elements/Tabs",
  component: Tabs,
  tags: ["autodocs"],
  argTypes: {
    tabs: {
      control: { type: "object" },
      description:
        "Array of tab items with id, label, content and optional icon and disabled properties",
    },
    modelValue: {
      control: { type: "text" },
      description: "ID of the currently active tab (v-model)",
    },
    containerClass: {
      control: { type: "text" },
      description: "Additional CSS classes for the tabs container",
    },
    "onUpdate:modelValue": {
      action: "update:modelValue",
      description: "Event emitted when the active tab changes",
      table: {
        category: "events",
        type: { summary: "string" },
      },
    },
  },
  args: {
    modelValue: "home",
    containerClass: "mb-5",
    tabs: [
      {
        id: "home",
        label: "Home",
        icon: "home-icon",
      },
      {
        id: "profile",
        label: "Profile",
        icon: "profile-icon",
      },
      {
        id: "contact",
        label: "Contact",
        icon: "contact-icon",
      },
      {
        id: "disabled",
        label: "Disabled",
        disabled: true,
      },
    ],
  },
  parameters: {
    docs: {
      description: {
        component: `
# Tabs Component

A flexible and customizable tab navigation component built with Vue 3, TypeScript, and Tailwind CSS. The Tabs component provides an intuitive interface for organizing content into separate, easily accessible sections.

## Features

- **Icon Support**: Each tab can include an optional icon displayed alongside the label
- **Disabled State**: Tabs can be marked as disabled to prevent user interaction
- **Custom Styling**: Customizable container classes for different styling needs
- **Slot-Based Content**: Use slots to provide custom content for each tab
- **Dark Mode Support**: Built-in styling for both light and dark themes
- **v-model Support**: Uses Vue 3's v-model for two-way binding of the active tab

## Usage

\`\`\`vue
<script setup lang="ts">
import { ref } from 'vue';
import Tabs from './components/Tabs.vue';
import type { TabItem } from './components/Tabs.vue';

const activeTab = ref('home');
const tabs: TabItem[] = [
  { id: 'home', label: 'Home' },
  { id: 'profile', label: 'Profile' },
  { id: 'contact', label: 'Contact' },
  { id: 'disabled', label: 'Disabled', disabled: true }
];
</script>

<template>
  <Tabs 
    :tabs="tabs" 
    v-model="activeTab">
    <!-- Optional custom icons and content via slots -->
  </Tabs>
</template>
\`\`\`
        `,
      },
    },
  },
} satisfies Meta<typeof Tabs>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "home",
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const activeTab = ref(args.modelValue);

      const onTabChange = (tabId: string) => {
        activeTab.value = tabId;
        console.log("Tab changed to:", tabId);
      };

      return { args, activeTab, onTabChange };
    },
    template: `
      <Tabs 
        :tabs="args.tabs" 
        v-model="activeTab"
        :containerClass="args.containerClass">
        
        <!-- Custom icons for tabs -->
        <template #icon-home>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        
        <template #icon-profile>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        
        <template #icon-contact>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        
        <!-- Custom content for each tab -->
        <template #content-home>
          <div>
            <h4 class="font-semibold text-2xl mb-4">We move your world!</h4>
            <p class="mb-4">Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.</p>
          </div>
        </template>
        
        <template #content-profile>
          <div>
            <div class="flex items-start">
              <div class="w-20 h-20 ltr:mr-4 rtl:ml-4 flex-none">
                <img src="https://html.vristo.sbthemes.com/assets/images/profile-34.jpeg" alt="profile" class="w-20 h-20 m-0 rounded-full ring-2 ring-[#ebedf2] dark:ring-white-dark object-cover" />
              </div>
              <div class="flex-auto">
                <h5 class="text-xl font-medium mb-4">Media heading</h5>
                <p class="text-white-dark">Cras sit amet nibh libero, in gravida nulla. Nulla vel metus scelerisque ante sollicitudin. Cras purus odio, vestibulum in vulputate at, tempus viverra turpis. Fusce condimentum nunc ac nisi vulputate fringilla. Donec lacinia congue felis in faucibus.</p>
              </div>
            </div>
          </div>
        </template>
        
        <template #content-contact>
          <div>
            <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story: "Default tabs with icons and custom content for each tab.",
      },
    },
  },
};

export const NoIcons: Story = {
  args: {
    modelValue: "tab1",
    tabs: [
      {
        id: "tab1",
        label: "Tab 1",
        content: "Content for Tab 1",
      },
      {
        id: "tab2",
        label: "Tab 2",
        content: "Content for Tab 2",
      },
      {
        id: "tab3",
        label: "Tab 3",
        content: "Content for Tab 3",
      },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const activeTab = ref(args.modelValue);

      const onTabChange = (tabId: string) => {
        activeTab.value = tabId;
        console.log("Tab changed to:", tabId);
      };

      return { args, activeTab, onTabChange };
    },
    template: `
      <Tabs 
        :tabs="args.tabs" 
        v-model="activeTab"
        :containerClass="args.containerClass">
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Simple tabs without icons, using the content property from tab items.",
      },
    },
  },
};

export const CustomStyles: Story = {
  args: {
    modelValue: "home",
    containerClass: "mb-5 bg-gray-100 p-4 rounded",
    tabs: [
      {
        id: "home",
        label: "Home",
        icon: "home-icon",
      },
      {
        id: "profile",
        label: "Profile",
        icon: "profile-icon",
      },
      {
        id: "contact",
        label: "Contact",
        icon: "contact-icon",
      },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const activeTab = ref(args.modelValue);

      const onTabChange = (tabId: string) => {
        activeTab.value = tabId;
        console.log("Tab changed to:", tabId);
      };

      return { args, activeTab, onTabChange };
    },
    template: `
      <Tabs 
        :tabs="args.tabs" 
        v-model="activeTab"
        :containerClass="args.containerClass">
        
        <!-- Custom icons -->
        <template #icon-home>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 9L12 2L21 9V20C21 20.5304 20.7893 21.0391 20.4142 21.4142C20.0391 21.7893 19.5304 22 19 22H5C4.46957 22 3.96086 21.7893 3.58579 21.4142C3.21071 21.0391 3 20.5304 3 20V9Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M9 22V12H15V22" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        
        <template #icon-profile>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M20 21V19C20 17.9391 19.5786 16.9217 18.8284 16.1716C18.0783 15.4214 17.0609 15 16 15H8C6.93913 15 5.92172 15.4214 5.17157 16.1716C4.42143 16.9217 4 17.9391 4 19V21" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M12 11C14.2091 11 16 9.20914 16 7C16 4.79086 14.2091 3 12 3C9.79086 3 8 4.79086 8 7C8 9.20914 9.79086 11 12 11Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        
        <template #icon-contact>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M4 4H20C21.1 4 22 4.9 22 6V18C22 19.1 21.1 20 20 20H4C2.9 20 2 19.1 2 18V6C2 4.9 2.9 4 4 4Z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
            <path d="M22 6L12 13L2 6" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
          </svg>
        </template>
        
        <!-- Custom content -->
        <template #content-home>
          <div>
            <h4 class="font-semibold text-2xl mb-4">Custom Styled Tab</h4>
            <p>This tab container has custom background styling applied via the containerClass prop.</p>
          </div>
        </template>
        
        <template #content-profile>
          <div>
            <p>You can style the container to match your design system.</p>
          </div>
        </template>
        
        <template #content-contact>
          <div>
            <p>The styling is applied to the entire tabs component container.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Tabs with custom container styling using the containerClass prop.",
      },
    },
  },
};

export const DisabledTab: Story = {
  args: {
    modelValue: "tab1",
    tabs: [
      {
        id: "tab1",
        label: "Active Tab",
      },
      {
        id: "tab2",
        label: "Regular Tab",
      },
      {
        id: "tab3",
        label: "Disabled Tab",
        disabled: true,
      },
    ],
  },
  render: (args) => ({
    components: { Tabs },
    setup() {
      const activeTab = ref(args.modelValue);

      const onTabChange = (tabId: string) => {
        activeTab.value = tabId;
        console.log("Tab changed to:", tabId);
      };

      return { args, activeTab, onTabChange };
    },
    template: `
      <Tabs 
        :tabs="args.tabs" 
        v-model="activeTab"
        :containerClass="args.containerClass">
        
        <template #content-tab1>
          <div>
            <h4 class="font-semibold text-xl mb-4">Active Tab Content</h4>
            <p>This is the content for the active tab.</p>
          </div>
        </template>
        
        <template #content-tab2>
          <div>
            <p>This is content for the second tab.</p>
          </div>
        </template>
        
        <template #content-tab3>
          <div>
            <p>This content won't be accessible because the tab is disabled.</p>
          </div>
        </template>
      </Tabs>
    `,
  }),
  parameters: {
    docs: {
      description: {
        story:
          "Example with a disabled tab that cannot be selected by the user.",
      },
    },
  },
};
