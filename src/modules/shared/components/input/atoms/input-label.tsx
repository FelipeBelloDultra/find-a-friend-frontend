import type { PropsWithChildren } from "react";

interface InputLabelProps {
  to: string;
}

export function InputLabel({ to, children }: PropsWithChildren<InputLabelProps>) {
  return (
    <label
      className="w-full inline-block font-bold text-base pb-2 ml-1"
      htmlFor={to}
      data-testid="input-label"
    >
      {children}
    </label>
  );
}
