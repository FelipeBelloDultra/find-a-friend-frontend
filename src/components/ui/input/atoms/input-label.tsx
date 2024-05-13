import type { PropsWithChildren } from "react";

interface InputLabelProps {
  to: string;
}

export function InputLabel({ to, children }: PropsWithChildren<InputLabelProps>) {
  return (
    <label
      className="w-full inline-block font-bold text-base mb-2 ml-1"
      htmlFor={to}
    >
      {children}
    </label>
  );
}
