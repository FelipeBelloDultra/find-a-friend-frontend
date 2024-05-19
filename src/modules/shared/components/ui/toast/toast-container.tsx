import { useCallback, useEffect, useState } from "react";
import { animated, useTransition } from "@react-spring/web";

import { ADD_TOAST_EVENT_NAME } from "~/modules/shared/hooks";

import { ToastItem } from "./toast-item";

import type { ToastData } from "./atoms/toast";
import type { Optional } from "~/types/optional";

export type AddToast = Optional<Omit<ToastData, "id">, "duration" | "type">;

export function ToastContainer() {
  const [toasts, setToasts] = useState<Array<ToastData>>([]);
  const transtions = useTransition(toasts, {
    from: { opacity: 0, maxHeight: 0 },
    enter: { opacity: 1, maxHeight: 200 },
    leave: { opacity: 0, maxHeight: 0 },
  });

  function handleAddToastEvent(event: CustomEvent<AddToast>) {
    const { detail } = event;
    const id = `${Date.now()}-${Math.random()}`;

    setToasts((toasts) => [
      ...toasts,
      {
        id,
        type: detail.type || "info",
        duration: detail.duration || 1000 * 3, // 3 seconds
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
      {transtions(({ maxHeight, opacity }, item) => (
        <animated.div
          style={{
            maxHeight,
            opacity,
            alignSelf: "end",
          }}
        >
          <ToastItem
            onRemoveToast={removeToast}
            toast={item}
          />
        </animated.div>
      ))}
    </div>
  );
}
