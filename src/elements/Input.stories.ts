import type { Meta, StoryObj } from "@storybook/vue3";
import Input from "./Input.vue";

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
      description: "Icon name to be displayed on the right side of the input",
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
  },
  args: {
    type: "text",
    placeholder: "Some Text...",
    disabled: false,
    required: false,
    error: false,
    errorMessage: "",
    iconName: "",
    id: "",
  },
  parameters: {
    docs: {
      description: {
        component: `
# Input Component

A flexible input component that supports various input types, icon integration, and visual states. This component is built with accessibility in mind and supports form validation states.

## Features
- Supports common input types (text, email, password, number, etc.)
- Optional label with required indicator
- Error state with custom error message
- Icon support on the right side
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

export const EmailInput: Story = {
  args: {
    type: "email",
    label: "Email Address",
    placeholder: "your@email.com",
    iconName: "mail",
    required: true,
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
    iconName: "lock",
    required: true,
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
    iconName: "alert-circle",
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

export const SearchInput: Story = {
  args: {
    type: "search",
    placeholder: "Search...",
    iconName: "search",
  },
  parameters: {
    docs: {
      description: {
        story: "Search input with search icon for improved user experience.",
      },
    },
  },
};

export const TelInput: Story = {
  args: {
    type: "tel",
    label: "Phone Number",
    placeholder: "(123) 456-7890",
    iconName: "phone",
  },
  parameters: {
    docs: {
      description: {
        story: "Telephone input with appropriate formatting placeholder.",
      },
    },
  },
};
