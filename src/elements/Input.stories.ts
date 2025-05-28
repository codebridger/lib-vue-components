import type { Meta, StoryObj } from "@storybook/vue3";
import Input from "./Input.vue";
import { ref } from "vue";

const meta = {
  title: "Elements/Input",
  component: Input,
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "inline-radio",
      options: [
        "text",
        "email",
        "password",
        "number",
        "tel",
        "url",
        "search",
        "range",
      ],
      description: "Input type attribute",
    },
    label: {
      control: "text",
      description: "Label of input",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    disabled: {
      control: "boolean",
      description: "Disabled state",
    },
    required: {
      control: "boolean",
      description: "Required state",
    },
    error: {
      control: "boolean",
      description: "Error state",
    },
    errorMessage: {
      control: "text",
      description: "Error message text",
    },
    iconName: {
      control: "select",
      options: [
        "",
        "IconSearch",
        "IconMail",
        "IconEye",
        "IconLock",
        "IconUser",
        "IconX",
      ],
      description: "Icon name to be displayed in the input",
    },
    iconPosition: {
      control: "inline-radio",
      options: ["left", "right"],
      description: "Position of the icon (left or right side of input)",
    },
    id: {
      control: "text",
      description: "Input ID attribute for label association",
    },
    min: {
      control: "number",
      description: "Minimum value for range inputs",
    },
    max: {
      control: "number",
      description: "Maximum value for range inputs",
    },
    onIconClick: {
      action: "iconClick",
      description: "Event emitted when icon is clicked",
    },
  },
  args: {
    type: "text",
    placeholder: "Some Text...",
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
    iconName: "",
    iconPosition: "left",
    id: "",
  },
  parameters: {
    docs: {
      description: {
        component: `
# Input Component

A flexible input component that supports various input types, icon integration with click events, and visual states. This component is built with accessibility in mind and supports form validation states.

## Features
- Supports common input types (text, email, password, number, etc.)
- Optional label with required indicator
- Error state with custom error message
- Icon support with configurable positioning (left/right)
- Clickable icons with event handling
- Disabled state
- Range input with min/max values
- Fully reactive with Vue's v-model
        `,
      },
    },
  },
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    placeholder: "Default input field",
  },
};

export const WithLabel: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    id: "username-input",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with a descriptive label to improve accessibility.",
      },
    },
  },
};

export const WithIcon: Story = {
  args: {
    label: "Search",
    placeholder: "Search for something...",
    iconName: "IconSearch",
    iconPosition: "left",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Input with a search icon to provide visual cues about the input's purpose.",
      },
    },
  },
};

export const WithIconRight: Story = {
  args: {
    label: "Username",
    placeholder: "Enter username",
    iconName: "IconUser",
    iconPosition: "right",
  },
  parameters: {
    docs: {
      description: {
        story: "Input with an icon positioned on the right side.",
      },
    },
  },
};

export const ClickableIcon: Story = {
  args: {
    label: "Password",
    placeholder: "Enter password",
    type: "password",
    iconName: "IconEye",
    iconPosition: "right",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Input with a clickable icon that can toggle password visibility or perform other actions.",
      },
    },
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const inputValue = ref("");
      const isPasswordVisible = ref(false);

      const handleIconClick = () => {
        isPasswordVisible.value = !isPasswordVisible.value;
        console.log("Icon clicked! Password visible:", isPasswordVisible.value);
      };

      return {
        args,
        inputValue,
        isPasswordVisible,
        handleIconClick,
        computedType: () => (isPasswordVisible.value ? "text" : "password"),
        computedIconName: () =>
          isPasswordVisible.value ? "IconEyeOff" : "IconEye",
      };
    },
    template: `
      <div class="space-y-2">
        <Input 
          v-model="inputValue"
          v-bind="args"
          :type="computedType()"
          :iconName="computedIconName()"
          @iconClick="handleIconClick"
        />
        <p class="text-sm text-gray-600">
          Click the eye icon to toggle password visibility
        </p>
      </div>
    `,
  }),
};

export const EmailInput: Story = {
  args: {
    type: "email",
    label: "Email Address",
    placeholder: "your@email.com",
    required: true,
    iconName: "IconMail",
    iconPosition: "left",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Email input with an appropriate mail icon and required indicator.",
      },
    },
  },
};

export const PasswordInput: Story = {
  args: {
    type: "password",
    label: "Password",
    placeholder: "Enter your password",
    required: true,
    iconName: "IconLock",
    iconPosition: "left",
  },
  parameters: {
    docs: {
      description: {
        story: "Password input with a lock icon to visually indicate security.",
      },
    },
  },
};

export const WithError: Story = {
  args: {
    label: "Email",
    placeholder: "Enter email",
    type: "email",
    error: true,
    errorMessage: "This field is required",
    iconName: "IconX",
    iconPosition: "right",
  },
  parameters: {
    docs: {
      description: {
        story: "Input in an error state with an alert icon and error message.",
      },
    },
  },
};

export const Disabled: Story = {
  args: {
    label: "Username",
    placeholder: "This field is disabled",
    disabled: true,
    iconName: "IconUser",
    iconPosition: "left",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Disabled input with visual indication of its unavailable state.",
      },
    },
  },
};

export const Required: Story = {
  args: {
    label: "Name",
    placeholder: "Enter your name",
    required: true,
  },
  parameters: {
    docs: {
      description: {
        story: "Required input with asterisk indicator next to the label.",
      },
    },
  },
};

export const NumberInput: Story = {
  args: {
    type: "number",
    label: "Age",
    placeholder: "Enter your age",
    min: 0,
    max: 120,
  },
  parameters: {
    docs: {
      description: {
        story: "Number input with minimum and maximum constraints.",
      },
    },
  },
};

export const Range: Story = {
  args: {
    type: "range",
    label: "Volume",
    id: "volume-input",
    modelValue: "50",
    min: 0,
    max: 100,
  },
  parameters: {
    docs: {
      description: {
        story: "Range slider input with label and min/max values.",
      },
    },
  },
};

export const TelInput: Story = {
  args: {
    type: "tel",
    label: "Phone Number",
    placeholder: "(123) 456-7890",
  },
  parameters: {
    docs: {
      description: {
        story: "Telephone input with appropriate formatting placeholder.",
      },
    },
  },
};

export const WithEnterKeyEvent: Story = {
  args: {
    label: "Quick Add",
    placeholder: "Type and press Enter",
    iconName: "IconSearch",
    iconPosition: "right",
  },
  parameters: {
    docs: {
      description: {
        story:
          "Input that captures values when Enter key is pressed and displays them in a list below.",
      },
    },
  },
  render: (args) => ({
    components: { Input },
    setup() {
      const inputValue = ref("");
      const enteredValues = ref<string[]>([]);

      const handleEnterKey = (value: string) => {
        if (value.trim()) {
          enteredValues.value.push(value);
        }
      };

      const handleIconClick = () => {
        if (inputValue.value.trim()) {
          enteredValues.value.push(inputValue.value);
          inputValue.value = "";
        }
      };

      return {
        args,
        inputValue,
        enteredValues,
        handleEnterKey,
        handleIconClick,
      };
    },
    template: `
      <div class="space-y-4">
        <Input 
          v-model="inputValue"
          v-bind="args"
          @enter="handleEnterKey"
          @iconClick="handleIconClick"
        />
        
        <div v-if="enteredValues.length > 0" class="mt-2 p-3 bg-gray-100 rounded">
          <p class="text-sm font-medium mb-2">Entered values:</p>
          <ul class="list-disc pl-5">
            <li v-for="(value, index) in enteredValues" :key="index" class="text-sm">
              {{ value }}
            </li>
          </ul>
          <p class="text-xs text-gray-500 mt-2">
            Try typing values and pressing Enter or clicking the search icon
          </p>
        </div>
      </div>
    `,
  }),
};
