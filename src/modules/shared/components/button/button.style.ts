import { tv } from "tailwind-variants";

import type { VariantProps } from "tailwind-variants";

export const styles = tv({
  base: "flex items-center justify-center w-full rounded-[20px] font-bold transition",
  variants: {
    variant: {
      primary: "bg-primary text-white data-[is-disabled=false]:hover:bg-primary/80",
      secondary: "bg-primary-800 text-primary data-[is-disabled=false]:hover:brightness-95",
      tertiary: "bg-tertiary text-primary data-[is-disabled=false]:hover:bg-tertiary/70",
    },
    size: {
      large: "h-16 text-xl px-8",
      medium: "h-14 text-lg px-4",
      small: "h-12 text-base px-3",
    },
    isDisabled: {
      true: "opacity-80 cursor-not-allowed",
    },
  },
  defaultVariants: {
    isDisabled: false,
    size: "large",
    variant: "primary",
  },
});

export type ButtonVariantProps = VariantProps<typeof styles>;
