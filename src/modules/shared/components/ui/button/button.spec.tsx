import { render, screen } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { Button } from "./button";
import { styles } from "./button.style";

import type { ButtonProps } from "./button";

function renderButton(buttonProps?: ButtonProps) {
  render(<Button {...buttonProps}>Click me</Button>);
}

describe("Button.tsx", () => {
  it("should renders primary button with default props", () => {
    renderButton();

    const sut = screen.getByRole("button");

    expect(sut).toBeInTheDocument();
    expect(sut).toHaveClass(styles({ variant: "primary" }));
  });

  it("should renders button with different size", () => {
    renderButton({ size: "small" });

    const sut = screen.getByRole("button");

    expect(sut).toHaveClass(styles({ size: "small" }));
  });

  it("should renders button with different variant", () => {
    renderButton({ variant: "secondary" });

    const sut = screen.getByRole("button");

    expect(sut).toHaveClass(styles({ variant: "secondary" }));
  });

  it("should renders disabled button", () => {
    renderButton({ isDisabled: true });

    const sut = screen.getByRole("button");

    expect(sut).toBeDisabled();
  });

  it("should renders button with loading indicator", () => {
    renderButton({ isLoading: true });

    const sut = screen.getByRole("button");

    expect(sut).toBeDisabled();
    expect(screen.getByTestId("button-loading")).toBeInTheDocument();
  });

  it("should renders custom className", () => {
    renderButton({ className: "custom-class" });

    const sut = screen.getByRole("button");

    expect(sut).toHaveClass("custom-class");
  });

  it("should emit click", async () => {
    const clickFn = vi.fn();
    renderButton({ onClick: clickFn });

    const sut = screen.getByRole("button");
    await userEvent.click(sut);

    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it("should not emit click if button is disabled", async () => {
    const clickFn = vi.fn();
    renderButton({ onClick: clickFn, isDisabled: true });

    const sut = screen.getByRole("button");
    await userEvent.click(sut);

    expect(clickFn).not.toHaveBeenCalled();
  });

  it("should not emit click if button is loading", async () => {
    const clickFn = vi.fn();
    renderButton({ onClick: clickFn, isLoading: true });

    const sut = screen.getByRole("button");
    await userEvent.click(sut);

    expect(clickFn).not.toHaveBeenCalled();
  });
});
