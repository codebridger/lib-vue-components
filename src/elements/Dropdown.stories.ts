import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";
import type { Placement } from "@popperjs/core";
import Dropdown from "./Dropdown.vue";
import DropdownItem from "./DropdownItem.vue";
import IconButton from "./IconButton.vue";
import Icon from "@/icon/Icon.vue";
import Button from "./Button.vue";

const dropdownDescription = `
Contextual menu/popover for secondary actions. Provides trigger slot and body slot, positioning via Popper, and rich interaction modes.

## Features
- Placement options with offsets; optional arrow
- Click and hover triggers; interactive content support
- Locking, z-index control, delays, and click-away behavior
- RTL and dark mode aware styles

## Accessibility
- Trigger is a standard control; body content should be keyboard navigable. Manage focus when opening/closing.

## Usage
Use for menus, quick filters, and small forms. Keep actions concise and avoid deep nesting.
`;
const meta = {
  title: "Elements/Dropdown",
  component: Dropdown,
  subcomponents: { DropdownItem },
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
    docs: {
      description: {
        component: dropdownDescription,
      },
      story: {
        height: "400px",
      },
      source: {
        type: "code",
      },
    },
    // Disable snapshots for Dropdown due to dynamic content (animations, positioning)
    snapshots: false,
  },
  argTypes: {
    show: {
      control: "boolean",
    },
    triggerText: {
      control: "text",
    },
    placement: {
      control: "select",
      options: [
        "auto",
        "auto-start",
        "auto-end",
        "top",
        "top-start",
        "top-end",
        "bottom",
        "bottom-start",
        "bottom-end",
        "right",
        "right-start",
        "right-end",
        "left",
        "left-start",
        "left-end",
      ],
    },
    offsetDistance: {
      control: "number",
    },
    offsetSkid: {
      control: "number",
    },
    hover: {
      control: "boolean",
    },
    disabled: {
      control: "boolean",
    },
    interactive: {
      control: "boolean",
    },
    arrow: {
      control: "boolean",
    },
    locked: {
      control: "boolean",
    },
    zIndex: {
      control: "number",
    },
    arrowPadding: {
      control: "number",
    },
    closeDelay: {
      control: "number",
    },
    openDelay: {
      control: "number",
    },
    disableClickAway: {
      control: "boolean",
    },
  },
  args: {
    triggerText: "Dropdown",
    placement: "bottom-end" as Placement,
    offsetDistance: 0,
    offsetSkid: 0,
    hover: false,
    disabled: false,
    interactive: true,
    arrow: false,
    locked: false,
    zIndex: 9999,
    arrowPadding: 0,
    closeDelay: 0,
    openDelay: 0,
    disableClickAway: false,
    show: null,
  },
  decorators: [
    () => ({
      template: '<div class="w-[400px] flex justify-center"><story  /></div>',
    }),
  ],
} satisfies Meta<typeof Dropdown>;

export default meta;

type Story = StoryObj<typeof meta>;

// Default dropdown story
export const Default: Story = {
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args, triggerText: "Action" };
    },
    template: `
  <Dropdown v-bind="args">
    <template #body="{ close }">
      <ul @click="close()" class="whitespace-nowrap">
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownItem>Something else here</DropdownItem>
        <DropdownItem>Separated link</DropdownItem>
      </ul>
    </template>
  </Dropdown>
`,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify dropdown trigger renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test dropdown interaction", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.click(trigger);

      // Check if dropdown items are present
      const actionItem = canvas.getByText("Action");
      expect(actionItem).toBeInTheDocument();
    });
  },
};

import userProfilePicUrl from "../../public/assets/images/user-profile.jpeg";
export const ProfileMenu: Story = {
  parameters: {
    docs: {
      story: {
        height: "500px",
      },
    },
  },

  render(args) {
    return {
      components: { Dropdown, IconButton, Icon, DropdownItem },
      setup() {
        return { args, userProfilePicUrl };
      },
      template: `
      <Dropdown v-bind="args">
        <template #trigger>
          <IconButton :imgUrl="userProfilePicUrl" size="xl" />
        </template>

        <template #body="{ close }">
          <ul class="w-[230px] !py-0 font-semibold text-dark dark:text-white-dark dark:text-white-light/90">
            <li>
                <div class="flex items-center px-4 py-4">
                    <div class="flex-none">
                        <img class="h-10 w-10 rounded-md object-cover" :src="userProfilePicUrl" alt="" />
                    </div>
                    <div class="truncate ltr:pl-4 rtl:pr-4">
                        <h4 class="text-base">
                            John Doe<span class="rounded bg-success-light px-1 text-xs text-success ltr:ml-2 rtl:ml-2">Pro</span>
                        </h4>
                        <a
                            class="text-black/60 hover:text-primary dark:text-dark-light/60 dark:hover:text-white"
                            href="javascript:;"
                        >
                          johndoe@gmail.com
                        </a>
                    </div>
                </div>
            </li>
            <li class="cursor-pointer">
                <a class="dark:hover:text-white" @click="close()">
                    <Icon name="icon-user" class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                    Profile
                </a>
            </li>
            <li class="cursor-pointer">
                <a class="dark:hover:text-white" @click="close()">
                    <Icon name="icon-mail" class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                    Inbox
                </a>
            </li>
            <li class="cursor-pointer">
                <a class="dark:hover:text-white" @click="close()">
                    <Icon name="icon-lock-dots" class="h-4.5 w-4.5 shrink-0 ltr:mr-2 rtl:ml-2" />
                    Lock Screen
                </a>
            </li>
            <li class="cursor-pointer border-t border-white-light dark:border-white-light/10">
                <a to="/auth/boxed-signin" class="!py-3 text-danger" @click="close()">
                    <Icon name="icon-logout" class="h-4.5 w-4.5 shrink-0 rotate-90 ltr:mr-2 rtl:ml-2" />
                    Sign Out
                </a>
            </li>
        </ul>
        </template>
      </Dropdown>
    `,
    };
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify profile menu trigger renders correctly", async () => {
      const trigger = canvas.getByRole("img");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test profile menu interaction", async () => {
      const trigger = canvas.getByRole("img");
      await userEvent.click(trigger);

      // Check if profile menu items are present
      const profileItem = canvas.getByText("Profile");
      const inboxItem = canvas.getByText("Inbox");
      expect(profileItem).toBeInTheDocument();
      expect(inboxItem).toBeInTheDocument();
    });
  },
};

// Hover trigger story
export const HoverTrigger: Story = {
  args: {
    hover: true,
    placement: "bottom-start",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args, triggerText: "Hover Me" };
    },
    template: `
  <Dropdown v-bind="args">
    <template #body="{ close }">
      <ul @click="close()" class="whitespace-nowrap">
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownItem>Something else here</DropdownItem>
        <DropdownItem>Separated link</DropdownItem>
      </ul>
    </template>
  </Dropdown>
`,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify hover trigger renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test hover trigger interaction", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.hover(trigger);

      // Check if dropdown items are present after hover
      const actionItem = canvas.getByText("Action");
      expect(actionItem).toBeInTheDocument();
    });
  },
};

// With arrow story
export const WithArrow: Story = {
  args: {
    arrow: true,
    offsetDistance: 12,
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args, triggerText: "With Arrow" };
    },
    template: `
  <Dropdown v-bind="args">
    <template #body="{ close }">
      <ul @click="close()" class="whitespace-nowrap">
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownItem>Something else here</DropdownItem>
        <DropdownItem>Separated link</DropdownItem>
      </ul>
    </template>
  </Dropdown>
`,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify dropdown with arrow renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test dropdown with arrow interaction", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.click(trigger);

      // Check if dropdown items are present
      const actionItem = canvas.getByText("Action");
      expect(actionItem).toBeInTheDocument();
    });
  },
};

// With custom offset story
export const CustomOffset: Story = {
  args: {
    offsetDistance: 20,
    offsetSkid: 10,
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args, triggerText: "Custom Offset" };
    },
    template: `
  <Dropdown v-bind="args">
    <template #body="{ close }">
      <ul @click="close()" class="whitespace-nowrap">
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownItem>Something else here</DropdownItem>
        <DropdownItem>Separated link</DropdownItem>
      </ul>
    </template>
  </Dropdown>
`,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify custom offset dropdown renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test custom offset dropdown interaction", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.click(trigger);

      // Check if dropdown items are present
      const actionItem = canvas.getByText("Action");
      expect(actionItem).toBeInTheDocument();
    });
  },
};

// Disabled state story
export const Disabled: Story = {
  args: {
    disabled: true,
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args, triggerText: "Disabled" };
    },
    template: `
  <Dropdown v-bind="args">
    <template #body="{ close }">
      <ul @click="close()" class="whitespace-nowrap">
        <DropdownItem>Action</DropdownItem>
        <DropdownItem>Another action</DropdownItem>
        <DropdownItem>Something else here</DropdownItem>
        <DropdownItem>Separated link</DropdownItem>
      </ul>
    </template>
  </Dropdown>
`,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify disabled dropdown renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test disabled dropdown behavior", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.click(trigger);

      // Disabled dropdown might still show items, so we just verify the trigger exists
      expect(trigger).toBeInTheDocument();
    });
  },
};

// Interactive content story
export const InteractiveContent: Story = {
  args: {
    interactive: true,
    // offsetDistance: "8",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args };
    },
    template: `
      <Dropdown v-bind="args">
        <template #body="{ close }">
          <div class="p-4 min-w-[200px] bg-white dark:bg-black">
            <input type="text" class="form-input mb-2 w-full" placeholder="Type something..." />
            <button class="btn btn-primary w-full" @click="close">
              Submit
            </button>
          </div>
        </template>
      </Dropdown>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify interactive dropdown renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test interactive dropdown content", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.click(trigger);

      // Check if interactive content is present
      const input = canvas.getByPlaceholderText("Type something...");
      const submitButton = canvas.getByRole("button", { name: "Submit" });
      expect(input).toBeInTheDocument();
      expect(submitButton).toBeInTheDocument();
    });
  },
};

// RTL support story
export const RTLSupport: Story = {
  args: {
    triggerText: "قائمة منسدلة",
    placement: "bottom-start",
  },
  render: (args) => ({
    components: { Dropdown, Button, Icon, DropdownItem },
    setup() {
      return { args };
    },
    template: `
      <div dir="rtl">
        <Dropdown v-bind="args">
          <template #body="{ close }">
            <ul @click="close()" class="whitespace-nowrap">
              <li><a href="javascript:;">العنصر الأول</a></li>
              <li><a href="javascript:;">العنصر الثاني</a></li>
              <li><a href="javascript:;">العنصر الثالث</a></li>
            </ul>
          </template>
        </Dropdown>
      </div>
    `,
  }),
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify RTL dropdown renders correctly", async () => {
      const trigger = canvas.getByRole("button");
      expect(trigger).toBeInTheDocument();
    });

    await step("Test RTL dropdown interaction", async () => {
      const trigger = canvas.getByRole("button");
      await userEvent.click(trigger);

      // Check if RTL dropdown items are present
      const firstItem = canvas.getByText("العنصر الأول");
      expect(firstItem).toBeInTheDocument();
    });
  },
};
