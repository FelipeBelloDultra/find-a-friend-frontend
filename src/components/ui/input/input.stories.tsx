import { Input } from "./input";

import { Input as InputComponent } from ".";

import type { Meta, StoryObj } from "@storybook/react";
import type { InputProps } from "./input";

function RenderEmptyInput(props: InputProps) {
  return (
    <div className="w-[400px]">
      <InputComponent.Root {...props} />
    </div>
  );
}

function RenderInputWithLabel(props: InputProps, label?: string) {
  return () => (
    <div className="w-[400px]">
      <InputComponent.Container>
        <InputComponent.Label to={props.name}>{label ?? "Input with label"}</InputComponent.Label>
        <InputComponent.Root {...props} />
      </InputComponent.Container>
    </div>
  );
}

function RenderInputWithErrorMessage(props: InputProps, errorMessage?: string) {
  return () => (
    <div className="w-[400px]">
      <InputComponent.Container>
        <InputComponent.Label to={props.name}>Label</InputComponent.Label>
        <InputComponent.Root {...props} />
        <InputComponent.Error message={errorMessage} />
      </InputComponent.Container>
    </div>
  );
}

const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
  argTypes: {
    type: {
      control: "select",
      options: ["text", "password", "email"],
      description: "Input type",
    },
    name: {
      control: "text",
      type: "string",
      description: "Input name",
    },
    className: {
      control: "text",
      type: "string",
      description: "Custom class name",
    },
    isDisabled: {
      control: "boolean",
      type: "boolean",
      description: "Disabled input state",
    },
    hasError: {
      control: "boolean",
      type: "boolean",
      description: "Input with error state",
    },
  },
  render: RenderEmptyInput,
  args: {
    placeholder: "Input text",
    name: "input-text",
    hasError: false,
    type: "text",
    isDisabled: false,
  },
};

type Story = StoryObj<typeof Input>;

export default meta;

export const InputTextWithoutLabel: Story = {
  render: RenderEmptyInput,
  args: {
    placeholder: "Input text",
    name: "input-text",
  },
};
export const InputWithLabel: Story = {
  render: (args) => RenderInputWithLabel(args)(),
  args: {
    type: "text",
    placeholder: "Input with label",
    name: "input-text-with-label",
  },
};
export const InputPassword: Story = {
  render: (args) => RenderInputWithLabel(args, "Password")(),
  args: {
    type: "password",
    placeholder: "Input password",
    name: "input-password-with-label",
  },
};
export const InputWithError: Story = {
  render: (args) => RenderInputWithLabel(args, "Password")(),
  args: {
    hasError: true,
    type: "password",
    placeholder: "Input password",
    name: "input-password-with-error",
  },
};
export const InputWithErrorMessage: Story = {
  render: (args) => RenderInputWithErrorMessage(args, "Something wrong happened")(),
  args: {
    hasError: true,
    type: "password",
    placeholder: "Input password",
    name: "input-password-with-error-message",
  },
};
export const InputDisabled: Story = {
  render: (args) => RenderInputWithLabel(args, "Password")(),
  args: {
    isDisabled: true,
    type: "password",
    placeholder: "Input password",
    name: "input-password-disabled",
  },
};
