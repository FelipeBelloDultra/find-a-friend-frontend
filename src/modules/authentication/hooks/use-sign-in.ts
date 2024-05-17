import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";

import { UnauthorizedError, UnprocessableError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";

import { useAuth } from "../hooks/use-auth";
import { useAuthStore } from "../store/auth-store";

import { schemas } from "./schemas";

import type { z } from "zod";

type SignInFormSchema = z.infer<typeof schemas.signIn>;

export function useSignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(schemas.signIn),
  });
  const { addToast } = useToast();
  const { authGateway } = useAuth();
  const { setToken } = useAuthStore();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: SignInFormSchema) => authGateway.authenticate(data),
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
    if (error instanceof UnauthorizedError) {
      addToast({
        message: t("login.form.error.unauthorized.title"),
        type: "error",
      });
      return;
    }

    if (error instanceof UnprocessableError) {
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
