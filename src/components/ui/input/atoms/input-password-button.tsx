import { Eye, EyeOff } from "lucide-react";

interface InputPasswordButtonProps {
  onInputPasswordButtonClicked: () => void;
  showPassword: boolean;
  inputHasError?: boolean;
}

export function InputPasswordButton({
  onInputPasswordButtonClicked,
  showPassword,
  inputHasError,
}: InputPasswordButtonProps) {
  const EYES_COLOR = inputHasError ? "stroke-red-400" : "stroke-primary/50";

  return (
    <span className="absolute right-4 top-0 h-full flex items-center justify-center">
      <button
        onClick={onInputPasswordButtonClicked}
        className="rounded-md p-2"
      >
        {showPassword ? <Eye className={EYES_COLOR} /> : <EyeOff className={EYES_COLOR} />}
      </button>
    </span>
  );
}
