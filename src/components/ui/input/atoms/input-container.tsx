import type { ReactNode } from "react";

export function InputContainer({ children }: { children: ReactNode }) {
  return <span className="inline-block w-full">{children}</span>;
}
