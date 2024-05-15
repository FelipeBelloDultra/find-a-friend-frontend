import { act, fireEvent, render, screen, within } from "@testing-library/react";
import { userEvent } from "@testing-library/user-event";

import { ADD_TOAST_EVENT_NAME } from "~/hooks/use-toast";

import { ToastContainer } from "./toast-container";

function addToast() {
  fireEvent(
    document,
    new CustomEvent(ADD_TOAST_EVENT_NAME, {
      detail: {
        message: "This is a test toast",
        type: "error",
      },
    }),
  );
}

describe("Toast.tsx", () => {
  it("should add a toast inside the container", () => {
    render(<ToastContainer />);
    addToast();

    const sut = screen.getByTestId("toast");

    expect(sut).toBeInTheDocument();
  });

  it("should render toast with default type", () => {
    render(<ToastContainer />);

    fireEvent(
      document,
      new CustomEvent(ADD_TOAST_EVENT_NAME, {
        detail: {
          message: "This is a test toast",
        },
      }),
    );

    const sut = screen.getByTestId("toast");
    const sutIcon = within(sut).getByTestId("toast-icon-info");

    expect(sut.getAttribute("data-toast-type")).toEqual("info");
    expect(sutIcon).toBeInTheDocument();
  });

  it("should render toast with custom type", () => {
    render(<ToastContainer />);
    addToast();

    const sut = screen.getByTestId("toast");
    const sutIcon = within(sut).getByTestId("toast-icon-error");

    expect(sut.getAttribute("data-toast-type")).toEqual("error");
    expect(sutIcon).toBeInTheDocument();
  });

  it("should render two toasts with inside the container", () => {
    render(<ToastContainer />);
    for (let index = 0; index < 2; index++) {
      addToast();
    }

    const sut = screen.getByTestId("toast-container");

    expect(sut.children.length).toBe(2);
  });

  it("should remove the toast from the container when click in the button", async () => {
    render(<ToastContainer />);
    addToast();
    const toastButton = screen.getAllByTestId("toast-button")[0];
    await userEvent.click(toastButton);

    const sut = screen.getByTestId("toast-container");

    expect(sut.children.length).toBe(0);
  });

  it("should remove the toast by timeout", async () => {
    vi.useFakeTimers();
    render(<ToastContainer />);
    addToast();
    const sut = screen.getByTestId("toast-container");

    act(() => {
      vi.advanceTimersByTime(5000);
    });

    expect(sut.children.length).toBe(0);
    vi.useRealTimers();
  });
});
