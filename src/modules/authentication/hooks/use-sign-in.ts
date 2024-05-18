import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";

import { UnauthorizedError, UnprocessableError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";

import { useAuth } from "../hooks/use-auth";

import { schemas } from "./schemas";

import type { z } from "zod";

type SignInFormSchema = z.infer<typeof schemas.signIn>;

export function useSignIn() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormSchema>({
    resolver: zodResolver(schemas.signIn),
  });
  const { addToast } = useToast();
  const { authenticate } = useAuth();

  function onErrorRequest(error: unknown) {
    if (error instanceof UnauthorizedError) {
      addToast({
        message: t("login.form.error.unauthorized.title"),
        type: "error",
      });
      setError("email", {
        message: t("login.form.error.unauthorized.title"),
      });
      setError("password", {
        message: t("login.form.error.unauthorized.title"),
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

  async function onSignInFormSubmit(data: SignInFormSchema) {
    try {
      await authenticate(data);

      addToast({
        message: t("login.form.success.title"),
        type: "success",
      });
    } catch (error) {
      onErrorRequest(error);
    }
  }

  return {
    errors,
    isLoading: isSubmitting,
    register,
    onSignInFormSubmit: handleSubmit(onSignInFormSubmit),
  };
}
