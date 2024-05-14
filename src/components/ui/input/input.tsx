import { forwardRef, useState } from "react";

import { styles } from "./input.style";
import { InputPasswordButton } from "./atoms";

import type { ComponentProps, ForwardedRef } from "react";

export interface InputProps extends ComponentProps<"input"> {
  type?: "text" | "password" | "email";
  name: string;
  hasError?: boolean;
  isDisabled?: boolean;
}

function InputForwardedRef(
  { type = "text", hasError = false, isDisabled = false, name, id, className, ...rest }: InputProps,
  ref: ForwardedRef<HTMLInputElement>,
) {
  const [showPassword, setShowPassword] = useState(false);

  function handleToggleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <span
      className={`relative inline-block h-16 w-full text-[0px] ${isDisabled && "opacity-40 pointer-events-none"}`}
    >
      <input
        {...rest}
        ref={ref}
        type={showPassword ? "text" : type}
        name={name}
        disabled={isDisabled}
        id={id || name}
        data-has-error={hasError}
        data-is-disabled={isDisabled}
        className={styles({
          className,
          isDisabled,
          hasError,
        })}
      />

      {type === "password" && (
        <InputPasswordButton
          onInputPasswordButtonClicked={handleToggleShowPassword}
          showPassword={showPassword}
          inputHasError={hasError}
        />
      )}
    </span>
  );
}

export const Input = forwardRef<HTMLInputElement, InputProps>(InputForwardedRef);

Input.displayName = "InputRoot";
