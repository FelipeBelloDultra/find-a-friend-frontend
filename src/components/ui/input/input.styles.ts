import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const styles = tv({
  base: "flex items-center justify-center w-full rounded-[10px] font-medium px-4 h-full text-base placeholder-primary/50",
  variants: {
    hasError: {
      true: "border-2 border-red-400 focus:ring-red-400 bg-red-100",
      false: "border border-primary-900 bg-primary-800",
    },
  },
});

export type InputVariantProps = VariantProps<typeof styles>;
