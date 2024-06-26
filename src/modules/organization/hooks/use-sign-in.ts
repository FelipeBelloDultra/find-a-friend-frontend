import { t } from "i18next";

import { UnauthorizedError, UnprocessableError } from "~/infra/http/errors";
import { useAuthentication } from "~/modules/authentication/hooks";
import { useForm, useToast } from "~/modules/shared/hooks";

import { schemas } from "../schemas";

import type { SignInFormSchema } from "../schemas";

export function useSignIn() {
  const { addToast } = useToast();
  const { authenticate } = useAuthentication();
  const { formErrors, handleSubmit, isLoading, register, setFormError } = useForm<
    SignInFormSchema,
    void
  >(schemas.signIn, {
    onSubmitFunction: authenticate,
    onError: onErrorRequest,
    onSuccess: () => {
      addToast({
        message: t("login.form.success.title"),
        type: "success",
      });
    },
  });

  function onErrorRequest(error: unknown) {
    if (error instanceof UnauthorizedError) {
      addToast({
        message: t("login.form.error.unauthorized.title"),
        type: "error",
      });
      setFormError("email", {
        message: t("login.form.error.unauthorized.title"),
      });
      setFormError("password", {
        message: t("login.form.error.unauthorized.title"),
      });
      return;
    }

    if (error instanceof UnprocessableError) {
      Object.entries(error.issues).forEach(([key, value]) => {
        if (key === "email" || key === "password") {
          setFormError(key, {
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

  return {
    errors: formErrors,
    isLoading,
    register,
    onSignInFormSubmit: handleSubmit,
  };
}
