import { t } from "i18next";
import { CircleCheck, Info, X, XCircle } from "lucide-react";
import { tv } from "tailwind-variants";

export interface ToastData {
  id: string;
  duration: number;
  message: string;
  type: "error" | "success" | "info";
}

export interface ToastProps {
  toast: ToastData;
  onToastButtonClicked: () => void;
}

const styles = tv({
  variants: {
    type: {
      error: "bg-red-100 text-red-800",
      info: "bg-blue-100 text-blue-800",
      success: "bg-green-100 text-green-800",
    },
  },
});

const TOAST_ICONS: Record<ToastData["type"], typeof XCircle | typeof Info | typeof CircleCheck> = {
  error: XCircle,
  info: Info,
  success: CircleCheck,
};
const TOAST_TITLE: Record<ToastData["type"], string> = {
  error: t("notification.toast.error"),
  info: t("notification.toast.info"),
  success: t("notification.toast.success"),
};

export function Toast({ toast, onToastButtonClicked }: ToastProps) {
  const Icon = TOAST_ICONS[toast.type || "info"];

  return (
    <div
      data-toast-type={toast.type || "info"}
      data-toast-id={toast.id}
      className={styles({
        type: toast.type || "info",
        class: "px-4 py-3 rounded-[10px] flex gap-2 shadow-md self-end md:max-w-full max-w-[300px]",
      })}
    >
      <Icon
        className="self-start flex-shrink-0 mr-1 md:inline-block hidden"
        height={26}
        width={26}
      />

      <div className="max-w-[350px] min-w-[150px] flex flex-col gap-1 break-words">
        <strong className="text-lg">{TOAST_TITLE[toast.type || "info"]}</strong>

        <small className="text-base">{toast.message}</small>
      </div>

      <button
        onClick={onToastButtonClicked}
        className="rounded-md p-1 self-start flex-shrink-0"
      >
        <X />
      </button>
    </div>
  );
}
