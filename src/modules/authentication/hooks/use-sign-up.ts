import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";

import { UnauthorizedHttpError, ValidationHttpError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";

import { useAuth } from "../hooks/use-auth";
import { useAuthStore } from "../store/auth-store";

import { schemas } from "./schemas";

import type { z } from "zod";

type SignUpFormSchema = z.infer<typeof schemas.signUp>;

export function useSignUp() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignUpFormSchema>({
    resolver: zodResolver(schemas.signUp),
  });
  const { addToast } = useToast();
  const { authGateway } = useAuth();
  const { setToken } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignUpFormSchema) => authGateway.authenticate(data),
    onSuccess: onSuccessRequest,
    onError: onErrorRequest,
  });

  function onSuccessRequest(token: string) {
    addToast({
      message: t("login.form.success.title"),
      type: "success",
    });
    setToken(token);
  }

  function onErrorRequest(error: Error) {
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
  }

  function onSignUpFormSubmit() {
    return handleSubmit((data) =>
      mutate({
        owner_name: data.owner_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
        password_confirmation: data.password_confirmation,
      }),
    );
  }

  return {
    errors,
    isLoading: isPending,
    register,
    onSignUpFormSubmit,
  };
}
