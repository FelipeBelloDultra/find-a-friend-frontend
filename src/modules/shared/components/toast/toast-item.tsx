import { useEffect } from "react";

import { Toast, type ToastData } from "./atoms/toast";

interface ToastProps {
  toast: ToastData;
  onRemoveToast: (id: string) => void;
}

export function ToastItem({ toast, onRemoveToast }: ToastProps) {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      onRemoveToast(toast.id);
    }, toast.duration);

    return () => {
      clearTimeout(timeoutId);
    };
  }, [onRemoveToast, toast.id, toast.duration]);

  return (
    <Toast
      toast={toast}
      onToastButtonClicked={() => onRemoveToast(toast.id)}
    />
  );
}
