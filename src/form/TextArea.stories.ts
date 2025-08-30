import type { Meta, StoryObj } from "@storybook/vue3";
import TextArea from "./TextArea.vue";
import { ref } from "vue";

const meta = {
  title: "Form/TextArea",
  component: TextArea,
  tags: ["autodocs"],
  argTypes: {
    modelValue: {
      control: "text",
      description: "The value of the textarea",
    },
    rows: {
      control: "number",
      description: "Number of rows to display",
    },
    placeholder: {
      control: "text",
      description: "Placeholder text",
    },
    required: {
      control: "boolean",
      description: "Whether the textarea is required",
    },
    disabled: {
      control: "boolean",
      description: "Whether the textarea is disabled",
    },
    error: {
      control: "boolean",
      description: "Whether the textarea is in error state",
    },
    errorMsg: {
      control: "text",
      description: "Error message to display",
    },
    label: {
      control: "text",
      description: "Label text for the textarea",
    },
    id: {
      control: "text",
      description: "ID for the textarea (used to associate label)",
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
      description: "Icon name to be displayed in the textarea",
    },
    iconOppositePosition: {
      control: "boolean",
      description:
        "When true, positions icon on the opposite side. Default: icon behind content (LTR: left, RTL: right). Opposite: icon after content (LTR: right, RTL: left)",
    },
  },
  args: {
    rows: 2,
    placeholder: "Enter Textarea ... ",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
    iconName: "",
    iconOppositePosition: false,
  },
  parameters: {
    docs: {
      description: {
        component: `
# TextArea Component

A flexible textarea component that supports icon integration with click events, validation states, and accessibility features. This component is built with accessibility in mind and supports form validation states.

## Features
- Configurable number of rows
- Optional label with required indicator
- Error state with custom error message
- Icon support with RTL/LTR aware positioning
- Clickable icons with event handling
- Disabled state
- Fully reactive with Vue's v-model
- Enter key event handling

## Icon Positioning
- **Default** (\`iconOppositePosition: false\`): Icons appear behind content (LTR: left, RTL: right)
- **Opposite** (\`iconOppositePosition: true\`): Icons appear after content (LTR: right, RTL: left)
        `,
      },
    },
  },
} satisfies Meta<typeof TextArea>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
  },
};

export const Filled: Story = {
  args: {
    modelValue: "This is a sample text in the textarea",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
  },
};

export const WithLabel: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter your comments",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
    label: "Comments",
  },
};

export const WithIcon: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Write your message...",
    label: "Message",
    iconName: "IconMail",
    iconOppositePosition: true,
  },
  parameters: {
    docs: {
      description: {
        story:
          "TextArea with an icon positioned on the opposite side (after content: LTR: right, RTL: left).",
      },
    },
  },
};

export const WithIconDefault: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter your comments...",
    label: "Comments",
    iconName: "IconUser",
    iconOppositePosition: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "TextArea with an icon using default positioning (behind content: LTR: left, RTL: right).",
      },
    },
  },
};

export const ClickableIcon: Story = {
  args: {
    modelValue: "",
    rows: 4,
    placeholder: "Write a comment and click the search icon to submit...",
    label: "Quick Comment",
    iconName: "IconSearch",
    iconOppositePosition: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "TextArea with a clickable icon that can submit or perform other actions using default positioning.",
      },
    },
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      const textValue = ref("");
      const submittedComments = ref<string[]>([]);

      const handleIconClick = () => {
        if (textValue.value.trim()) {
          submittedComments.value.push(textValue.value);
          textValue.value = "";
          console.log("Icon clicked! Comment submitted");
        }
      };

      return {
        args,
        textValue,
        submittedComments,
        handleIconClick,
      };
    },
    template: `
      <div class="space-y-4">
        <TextArea 
          v-model="textValue"
          v-bind="args"
          @iconClick="handleIconClick"
        />
        
        <div v-if="submittedComments.length > 0" class="mt-2 p-3 bg-gray-100 rounded">
          <p class="text-sm font-medium mb-2">Submitted comments:</p>
          <ul class="space-y-2">
            <li v-for="(comment, index) in submittedComments" :key="index" class="text-sm bg-white p-2 rounded border">
              {{ comment }}
            </li>
          </ul>
        </div>
        
        <p class="text-sm text-gray-600">
          Click the search icon to submit your comment.
        </p>
      </div>
    `,
  }),
};

export const Required: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Required textarea",
    required: true,
    disabled: false,
    error: false,
    errorMsg: "",
    iconName: "IconLock",
    iconOppositePosition: true,
  },
};

export const Disabled: Story = {
  args: {
    modelValue: "This textarea is disabled",
    rows: 3,
    placeholder: "Enter Textarea",
    required: false,
    disabled: true,
    error: false,
    errorMsg: "",
    iconName: "IconUser",
    iconOppositePosition: true,
  },
};

export const WithError: Story = {
  args: {
    modelValue: "",
    rows: 3,
    placeholder: "Enter Textarea",
    required: true,
    disabled: false,
    error: true,
    errorMsg: "This field is required",
    iconName: "IconX",
    iconOppositePosition: false,
  },
};

export const CustomRows: Story = {
  args: {
    modelValue: "",
    rows: 5,
    placeholder: "This textarea has 5 rows",
    required: false,
    disabled: false,
    error: false,
    errorMsg: "",
    iconName: "IconMail",
    iconOppositePosition: true,
  },
};

export const RTLIconComparison: Story = {
  parameters: {
    docs: {
      description: {
        story:
          "Comparison showing how icon positioning works with RTL/LTR awareness and iconOppositePosition.",
      },
    },
  },
  render: (args) => ({
    components: { TextArea },
    setup() {
      return { args };
    },
    template: `
      <div class="space-y-6">
        <div class="space-y-2">
          <h3 class="font-semibold">Default Icon Positioning (iconOppositePosition: false)</h3>
          <TextArea 
            label="Message (Default)"
            placeholder="LTR: icon on right, RTL: icon on left"
            iconName="IconMail"
            :iconOppositePosition="false"
            rows="2"
          />
        </div>
        
        <div class="space-y-2">
          <h3 class="font-semibold">Opposite Icon Positioning (iconOppositePosition: true)</h3>
          <TextArea 
            label="Message (Opposite)"
            placeholder="LTR: icon on left, RTL: icon on right"
            iconName="IconMail"
            :iconOppositePosition="true"
            rows="2"
          />
        </div>
        
        <div class="text-sm text-gray-600 bg-blue-50 p-3 rounded">
          <p><strong>Note:</strong> Icon positioning adapts to your app's RTL/LTR direction automatically.</p>
          <p>• <strong>LTR (Left-to-Right):</strong> Default = right, Opposite = left</p>
          <p>• <strong>RTL (Right-to-Left):</strong> Default = left, Opposite = right</p>
        </div>
      </div>
    `,
  }),
};

export const EnterKeyExample: Story = {
  render: (args) => ({
    components: { TextArea },
    setup() {
      const inputText = ref("");
      const notes = ref<string[]>([]);

      const addNote = (value: string) => {
        notes.value.push(value);
        // Component already clears the input after enter event
      };

      const handleIconClick = () => {
        if (inputText.value.trim()) {
          notes.value.push(inputText.value);
          inputText.value = "";
        }
      };

      return { args, inputText, notes, addNote, handleIconClick };
    },
    template: `
      <div class="p-4">
        <h3 class="text-lg font-semibold mb-2">Enter Key Demo</h3>
        <TextArea 
          v-model="inputText"
          v-bind="args"
          label="Type and press Enter"
          placeholder="Type something and press Enter or click the icon to add a note"
          iconName="IconSearch"
          :iconOppositePosition="false"
          @enter="addNote" 
          @iconClick="handleIconClick"
        />
        
        <div class="mt-4">
          <h4 class="font-medium mb-1">Notes:</h4>
          <ul class="border rounded p-2 min-h-[100px] bg-gray-50">
            <li v-for="(note, index) in notes" :key="index" class="py-1">
              {{ note }}
            </li>
            <li v-if="notes.length === 0" class="text-gray-400 py-1">
              No notes yet. Type something and press Enter or click the search icon.
            </li>
          </ul>
        </div>
        
        <p class="text-sm text-gray-600 mt-2">
          Icon positioning adapts automatically to your app's RTL/LTR direction.
        </p>
      </div>
    `,
  }),
  args: {
    rows: 2,
    required: false,
    disabled: false,
    error: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This example demonstrates how to use the Enter key or icon click to capture and display input values from the TextArea component. When you press Enter or click the icon, the current value is added to the list below and the textarea is cleared. Icon positioning adapts to RTL/LTR automatically.",
      },
    },
  },
};

export const IconPositioningComparison: Story = {
  args: {
    label: "Icon Positioning Demo",
    placeholder: "See different icon positions in textarea",
    rows: 3,
    iconName: "IconMail",
    iconOppositePosition: false,
  },
  parameters: {
    docs: {
      description: {
        story:
          "This story demonstrates the two icon positioning modes in TextArea. Toggle `iconOppositePosition` to see the difference between behind content (default) and after content (opposite).",
      },
    },
  },
};
