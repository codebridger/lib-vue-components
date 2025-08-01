import type { Meta, StoryObj } from "@storybook/vue3";
import { expect, within, userEvent } from "@storybook/test";

import IconButton from "./IconButton.vue";

const meta = {
  title: "Elements/IconButton",
  component: IconButton,
  // This component will have an automatically generated docsPage entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ["autodocs"],
  argTypes: {
    rounded: {
      control: "select",
      options: ["full", "none", "xs", "sm", "md", "lg", "xl"],
    },
    size: {
      control: "select",
      options: ["xs", "sm", "md", "lg", "xl"],
    },
    icon: {
      control: "text",
    },
    isLoading: {
      control: "boolean",
      description: "Shows a loading spinner when true",
    },
    loadingIcon: {
      control: "select",
      options: ["IconLoader", "IconRefresh", "IconRestore"],
      description: "Icon to show when loading",
    },
    disabled: {
      control: "boolean",
      description: "Disables the button",
    },
  },
  args: {
    size: "sm",
    isLoading: false,
    loadingIcon: "IconLoader",
    disabled: false,
  },
} satisfies Meta<typeof IconButton>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Test icon button interaction", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      await userEvent.click(button);
      expect(button).toBeInTheDocument();
    });
  },
};

export const Loading: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    isLoading: true,
    size: "md",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify loading icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Verify loading state", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      const loadingIcon = button.querySelector("svg");
      expect(loadingIcon).toBeInTheDocument();
      expect(loadingIcon).toHaveClass("animate-[spin_2s_linear_infinite]");
    });
  },
};

export const LoadingWithCustomIcon: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    isLoading: true,
    loadingIcon: "IconRefresh",
    size: "lg",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step(
      "Verify custom loading icon button renders correctly",
      async () => {
        const buttons = canvas.getAllByRole("generic");
        const button = buttons[1]; // Skip the main wrapper, get the actual button
        expect(button).toBeInTheDocument();
        expect(button).toHaveClass("rounded-full");
      }
    );

    await step("Verify custom loading icon is displayed", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      const loadingIcon = button.querySelector("svg");
      expect(loadingIcon).toBeInTheDocument();
      expect(loadingIcon).toHaveClass("animate-[spin_2s_linear_infinite]");
    });
  },
};

import userProfilePicUrl from "../../public/assets/images/user-profile.jpeg";
export const WithImages: Story = {
  args: {
    rounded: "full",
    size: "xl",
    imgUrl: userProfilePicUrl,
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify image icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Verify image is displayed", async () => {
      const image = canvas.getByRole("img");
      expect(image).toBeInTheDocument();
      expect(image).toHaveAttribute("src", userProfilePicUrl);
    });
  },
};

export const Disabled: Story = {
  args: {
    rounded: "full",
    icon: "IconSun",
    disabled: true,
    size: "md",
  },
  play: async ({ canvasElement, step }) => {
    const canvas = within(canvasElement);

    await step("Verify disabled icon button renders correctly", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toBeInTheDocument();
      expect(button).toHaveClass("rounded-full");
    });

    await step("Verify disabled state", async () => {
      const buttons = canvas.getAllByRole("generic");
      const button = buttons[1]; // Skip the main wrapper, get the actual button
      expect(button).toHaveAttribute("disabled", "true");
    });
  },
};
