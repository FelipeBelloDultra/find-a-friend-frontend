import { styles } from "./button.style";
import { ButtonLoading } from "./atoms/button-loading";

import type { ComponentProps } from "react";
import type { ButtonVariantProps } from "./button.style";

export interface ButtonProps extends ComponentProps<"button">, ButtonVariantProps {
  size?: "large" | "medium" | "small";
  variant?: "primary" | "secondary" | "tertiary";
  isDisabled?: boolean;
  isLoading?: boolean;
}

export function Button({
  size = "large",
  variant = "primary",
  isDisabled = false,
  isLoading = false,
  children,
  className,
  ...rest
}: ButtonProps) {
  const shouldBlockButton = isDisabled || isLoading;

  return (
    <button
      {...rest}
      disabled={shouldBlockButton}
      data-is-disabled={shouldBlockButton}
      data-size={size}
      data-is-loading={isLoading}
      data-variant={variant}
      data-testid="button"
      className={styles({ size, variant, className, isDisabled: shouldBlockButton })}
    >
      {isLoading ? (
        <ButtonLoading
          size={size}
          variant={variant}
        />
      ) : (
        children
      )}
    </button>
  );
}
