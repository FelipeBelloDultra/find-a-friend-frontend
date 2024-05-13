import { fireEvent, render, screen } from "@testing-library/react";

import { Button } from "./button";
import { styles } from "./button.style";

describe("Button.tsx", () => {
  it("should renders primary button with default props", () => {
    render(<Button>Click me</Button>);

    const sut = screen.getByRole("button");

    expect(sut).toBeInTheDocument();
    expect(sut).toHaveClass(styles({ variant: "primary" }));
  });

  it("should renders button with different size", () => {
    render(<Button size="small">Click me</Button>);

    const sut = screen.getByRole("button");

    expect(sut).toHaveClass(styles({ size: "small" }));
  });

  it("should renders button with different variant", () => {
    render(<Button variant="secondary">Click me</Button>);

    const sut = screen.getByRole("button");

    expect(sut).toHaveClass(styles({ variant: "secondary" }));
  });

  it("should renders disabled button", () => {
    render(<Button isDisabled>Click me</Button>);

    const sut = screen.getByRole("button");

    expect(sut).toBeDisabled();
  });

  it("should renders button with loading indicator", () => {
    render(<Button isLoading>Loading</Button>);

    const sut = screen.getByRole("button");

    expect(sut).toBeDisabled();
    expect(screen.getByTestId("button-loading")).toBeInTheDocument();
  });

  it("should renders custom className", () => {
    render(<Button className="custom-class">Click me</Button>);

    const sut = screen.getByRole("button");

    expect(sut).toHaveClass("custom-class");
  });

  it("should emit click", () => {
    const clickFn = vi.fn();
    render(<Button onClick={clickFn}>Button</Button>);

    const sut = screen.getByRole("button");
    fireEvent.click(sut);

    expect(clickFn).toHaveBeenCalledTimes(1);
  });

  it("should not emit click if button is disabled", () => {
    const clickFn = vi.fn();
    render(
      <Button
        onClick={clickFn}
        isDisabled
      >
        Button
      </Button>,
    );

    const sut = screen.getByRole("button");
    fireEvent.click(sut);

    expect(clickFn).not.toHaveBeenCalled();
  });

  it("should not emit click if button is loading", () => {
    const clickFn = vi.fn();
    render(
      <Button
        onClick={clickFn}
        isLoading
      >
        Button
      </Button>,
    );

    const sut = screen.getByRole("button");
    fireEvent.click(sut);

    expect(clickFn).not.toHaveBeenCalled();
  });
});
