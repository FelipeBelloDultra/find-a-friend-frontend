import { render, screen } from "@testing-library/react";
import fireEvent from "@testing-library/user-event";

import { Input } from "./input";

import type { InputProps } from "./input";

function renderInput(inputProps: InputProps, label?: string, errorMessage?: string) {
  const { name, type, ...rest } = inputProps;

  render(
    <Input.Container>
      {label && <Input.Label to={name}>{label}</Input.Label>}
      <Input
        hasError={!!errorMessage}
        {...rest}
        name={name}
        type={type || "text"}
      />
      <Input.Error message={errorMessage} />
    </Input.Container>,
  );
}

describe("Input.tsx", () => {
  it("should renders input type text without label", () => {
    renderInput({
      name: "input-test-1",
    });

    const sut = screen.getByRole("textbox");

    expect(sut).toBeInTheDocument();
    expect(sut).toHaveProperty("type", "text");
    expect(screen.queryByTestId("input-label")).not.toBeInTheDocument();
  });

  it("should render input with label", () => {
    renderInput({ name: "input-test-2" }, "label");

    const sut = screen.getByRole("textbox");

    expect(sut).toBeInTheDocument();
    expect(screen.getByTestId("input-label")).toBeInTheDocument();
  });

  it("should focus on input with label click", async () => {
    renderInput({ name: "input-test-3" }, "label");

    const sut = screen.getByRole("textbox");
    await fireEvent.click(screen.getByTestId("input-label"));

    expect(sut.matches(":focus")).toBeTruthy();
  });

  it("should change value on input typing", async () => {
    const spyFn = vi.fn();
    const FINAL_VALUE = "testing";
    renderInput(
      {
        name: "input-test-4",
        onChange: spyFn,
      },
      "label",
    );

    const sut = screen.getByRole("textbox");
    sut.focus();
    await fireEvent.keyboard(FINAL_VALUE);

    expect(spyFn).toBeCalledTimes(FINAL_VALUE.length);
    expect(sut).toHaveValue(FINAL_VALUE);
  });

  it("should render input with error", () => {
    renderInput(
      {
        hasError: true,
        name: "input-test-5",
      },
      "label",
    );

    const sut = screen.getByRole("textbox");

    expect(sut).toHaveAttribute("data-has-error", "true");
  });

  it("should render input with error and message", () => {
    renderInput(
      {
        hasError: true,
        name: "input-test-5",
      },
      "label",
      "Something wrong happened",
    );

    const sut = screen.getByRole("textbox");

    expect(sut).toHaveAttribute("data-has-error", "true");
    expect(screen.queryByTestId("input-error")).toBeInTheDocument();
  });

  it("should not change value on input typing if input is disabled", async () => {
    const spyFn = vi.fn();
    renderInput(
      {
        hasError: true,
        name: "input-test-6",
        isDisabled: true,
        onChange: spyFn,
      },
      "label",
      "Something wrong happened",
    );

    const sut = screen.getByRole("textbox");
    sut.focus();
    await fireEvent.keyboard("testing");

    expect(spyFn).not.toHaveBeenCalled();
  });
});
