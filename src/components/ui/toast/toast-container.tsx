import { useCallback, useEffect, useState } from "react";

import { ADD_TOAST_EVENT_NAME } from "~/hooks/use-toast";

import { ToastItem } from "./toast-item";

import type { ToastData } from "./atoms/toast";
import type { Optional } from "~/types/optional";

export type AddToast = Optional<Omit<ToastData, "id">, "duration" | "type">;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);

  function handleAddToastEvent(event: CustomEvent<AddToast>) {
    const { detail } = event;
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((toasts) => [
      ...toasts,
      {
        id,
        type: detail.type || "info",
        duration: detail.duration || 1000 * 5, // 5 seconds,
        message: detail.message,
      },
    ]);
  }

  useEffect(() => {
    document.addEventListener(ADD_TOAST_EVENT_NAME, handleAddToastEvent as EventListener);
    return () => {
      document.removeEventListener(ADD_TOAST_EVENT_NAME, handleAddToastEvent as EventListener);
    };
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prevToasts) => {
      return prevToasts.filter((toast) => toast.id !== id);
    });
  }, []);

  return (
    <div
      data-testid="toast-container"
      className="fixed z-50 top-6 right-2 md:top-12 md:right-12 flex flex-col gap-2"
    >
      {toasts.map((toast) => (
        <ToastItem
          key={toast.id}
          toast={toast}
          onRemoveToast={removeToast}
        />
      ))}
    </div>
  );
}
