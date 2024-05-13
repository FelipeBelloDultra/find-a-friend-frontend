import type { ButtonVariantProps } from "~/components/ui/button/button.style";

type ButtonSizes = Required<Pick<ButtonVariantProps, "size">>;
type ButtonVariants = Required<Pick<ButtonVariantProps, "variant">>;
type ButtonLoadingProps = ButtonSizes & ButtonVariants;

export function ButtonLoading({ size, variant }: ButtonLoadingProps) {
  const SIZE_MAPPINGS = {
    large: "h-3 w-3",
    medium: "h-2 w-2",
    small: "h-2 w-2",
  };
  const VARIANT_MAPPINGS = {
    primary: "bg-white",
    secondary: "bg-primary",
    tertiary: "bg-primary",
  };

  return (
    <div
      className="flex w-full h-full items-center justify-center gap-1 bg-transparent relative"
      data-testid="button-loading"
    >
      <span className="sr-only">Loading...</span>
      <div
        className={`${SIZE_MAPPINGS[size]} ${VARIANT_MAPPINGS[variant]} rounded-full animate-bounce [animation-delay:-0.3s]`}
      />
      <div
        className={`${SIZE_MAPPINGS[size]} ${VARIANT_MAPPINGS[variant]} rounded-full animate-bounce [animation-delay:-0.15s]`}
      />
      <div
        className={`${SIZE_MAPPINGS[size]} ${VARIANT_MAPPINGS[variant]} rounded-full animate-bounce`}
      />
    </div>
  );
}
