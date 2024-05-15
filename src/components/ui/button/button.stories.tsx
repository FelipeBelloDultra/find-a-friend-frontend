import { fn } from "@storybook/test";

import { Button } from "./button";

import type { Meta, StoryObj } from "@storybook/react";
import type { ButtonProps } from "./button";

function RenderButton(props: ButtonProps) {
  return (
    <div className="w-[400px]">
      <Button {...props}>{props.children}</Button>
    </div>
  );
}

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    className: {
      control: "text",
      type: "string",
      description: "Custom class name",
    },
    variant: {
      control: "select",
      type: "string",
      description: "Variant to be defined",
      options: ["primary", "secondary", "tertiary"],
      table: {
        type: {
          summary: "primary, secondary, tertiary",
        },
      },
    },
    isDisabled: {
      control: "boolean",
      type: "boolean",
      description: "Disabled button state",
    },
    isLoading: {
      control: "boolean",
      type: "boolean",
      description: "Loading button state",
    },
    size: {
      control: "select",
      type: "string",
      description: "Size to be defined",
      options: ["large", "medium", "small"],
      table: {
        type: {
          summary: "large, medium, small",
        },
      },
    },
  },
  args: {
    variant: "primary",
    size: "large",
    isDisabled: false,
    isLoading: false,
    onClick: fn(),
  },
  render: RenderButton,
};

type Story = StoryObj<typeof Button>;

export default meta;

export const VariantPrimary: Story = {
  render: RenderButton,
  args: {
    variant: "primary",
    children: "Primary button",
  },
};
export const VariantSecondary: Story = {
  render: RenderButton,
  args: {
    variant: "secondary",
    children: "Secondary button",
  },
};
export const VariantTertiary: Story = {
  render: RenderButton,
  args: {
    variant: "tertiary",
    children: "Tertiary button",
  },
};
export const SizeLarge: Story = {
  render: RenderButton,
  args: {
    size: "large",
    children: "Large button",
  },
};
export const SizeMedium: Story = {
  render: RenderButton,
  args: {
    size: "medium",
    children: "Medium button",
  },
};
export const SizeSmall: Story = {
  render: RenderButton,
  args: {
    size: "small",
    children: "Small button",
  },
};
export const IsDisabledTrue: Story = {
  render: RenderButton,
  args: {
    isDisabled: true,
    children: "Is disabled button",
  },
};
export const IsLoadingTrue: Story = {
  render: RenderButton,
  args: {
    isLoading: true,
    children: "Is loading button",
  },
};
