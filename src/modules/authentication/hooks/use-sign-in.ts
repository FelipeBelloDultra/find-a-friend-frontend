import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "i18next";

import { UnauthorizedHttpError, ValidationHttpError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";

import { useAuth } from "../hooks/use-auth";

const schema = z.object({
  email: z
    .string()
    .email(t("validation.email"))
    .min(
      6,
      t("validation.min.email", {
        minSize: 6,
      }),
    )
    .max(
      255,
      t("validation.max.email", {
        maxSize: 255,
      }),
    ),
  password: z
    .string()
    .min(
      6,
      t("validation.min.password", {
        minSize: 6,
      }),
    )
    .max(
      255,
      t("validation.max.password", {
        maxSize: 255,
      }),
    ),
});
type SignInFormSchema = z.infer<typeof schema>;

export function useSignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(schema),
  });
  const { addToast } = useToast();
  const { authGateway } = useAuth();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInFormSchema) => authGateway.authenticate(data),
    onSuccess: (value) => {
      addToast({
        message: t("login.form.success.title"),
        type: "success",
      });
      console.log({ value });
    },
    onError: (error) => {
      if (error instanceof UnauthorizedHttpError) {
        addToast({
          message: t("login.form.error.unauthorized.title"),
          type: "error",
        });
        return;
      }

      if (error instanceof ValidationHttpError) {
        Object.entries(error.issues).forEach(([key, value]) => {
          if (key === "email" || key === "password") {
            setError(key, {
              message: value[0],
            });
          }
        });
        addToast({
          message: t("login.form.error.validation.title"),
          type: "error",
        });
        return;
      }

      addToast({
        message: t("login.form.error.internal.title"),
        type: "error",
      });
    },
  });

  function onSignInFormSubmit() {
    return handleSubmit((data) =>
      mutate({
        email: data.email,
        password: data.password,
      }),
    );
  }

  return {
    errors,
    isLoading: isPending,
    register,
    onSignInFormSubmit,
  };
}
