import { useState } from "react";

import { styles } from "./input.styles";
import { InputLabel } from "./atoms/input-label";
import { InputContainer } from "./atoms/input-container";
import { InputPasswordButton } from "./atoms/input-password-button";
import { InputError } from "./atoms/input-error";

import type { ComponentProps } from "react";

export interface InputProps extends ComponentProps<"input"> {
  type?: "text" | "password" | "email";
  name: string;
  hasError?: boolean;
}

export function Input({
  type = "text",
  hasError = false,
  name,
  id,
  className,
  ...rest
}: InputProps) {
  const [showPassword, setShowPassword] = useState(false);

  function handleToggleShowPassword() {
    setShowPassword((prevState) => !prevState);
  }

  return (
    <span className="relative inline-block h-16 w-full text-[0px]">
      <input
        {...rest}
        type={showPassword ? "text" : type}
        name={name}
        id={id || name}
        data-has-error={hasError}
        className={styles({
          className: `${className} ${type === "password" && "pr-16"}`,
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

Input.Label = InputLabel;
Input.Container = InputContainer;
Input.Error = InputError;
