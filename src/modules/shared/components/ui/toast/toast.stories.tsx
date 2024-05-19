import { fn } from "@storybook/test";

import { Toast } from "./atoms/toast";

import type { Meta, StoryObj } from "@storybook/react";

const meta: Meta<typeof Toast> = {
  title: "Components/UI/Toast",
  component: Toast,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    toast: {
      control: "object",
      description: "Toast data",
      table: {
        type: {
          summary: JSON.stringify({
            id: "toast-id",
            duration: 3000,
            message: "Toast message",
            type: "info",
          }),
        },
      },
    },
    onToastButtonClicked: {
      type: "function",
      description: "Toast button click handler",
      table: {
        type: {
          summary: "() => void",
        },
      },
    },
  },
  args: {
    toast: {
      id: "toast-id",
      duration: 3000,
      message: "Toast message",
      type: "info",
    },
    onToastButtonClicked: fn(),
  },
  render: Toast,
};

type Story = StoryObj<typeof Toast>;

export default meta;

export const ToastInfo: Story = {
  render: Toast,
  args: {
    toast: {
      id: "toast-id-info",
      duration: 3000,
      message: "Toast info message",
      type: "info",
    },
    onToastButtonClicked: fn(),
  },
};
export const ToastSuccess: Story = {
  render: Toast,
  args: {
    toast: {
      id: "toast-id-success",
      duration: 3000,
      message: "Toast success message",
      type: "success",
    },
    onToastButtonClicked: fn(),
  },
};
export const ToastError: Story = {
  render: Toast,
  args: {
    toast: {
      id: "toast-id-error",
      duration: 3000,
      message: "Toast error message",
      type: "error",
    },
    onToastButtonClicked: fn(),
  },
};
