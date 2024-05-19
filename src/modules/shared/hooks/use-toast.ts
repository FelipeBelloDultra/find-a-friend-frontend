import type { AddToast } from "../components/ui/toast";

export const ADD_TOAST_EVENT_NAME = "add-toast";

export function useToast() {
  function addToast(data: AddToast) {
    document.dispatchEvent(
      new CustomEvent(ADD_TOAST_EVENT_NAME, {
        detail: data,
      }),
    );
  }

  return {
    addToast,
  };
}
