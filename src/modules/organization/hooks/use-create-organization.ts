import { useNavigate } from "react-router-dom";
import { t } from "i18next";

import { ConflictError, UnprocessableError } from "~/infra/http/errors";
import { ROUTES } from "~/router/constants";
import { useForm, useHttp, useToast } from "~/modules/shared/hooks";

import { schemas } from "../schemas";

import type { CreateOrganizationFormSchema } from "../schemas";

export function useCreateOrganization() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { organizationGateway } = useHttp();
  const { formErrors, handleSubmit, isLoading, register, setFormError } = useForm<
    CreateOrganizationFormSchema,
    void
  >(schemas.createOrgnanization, {
    onSubmitFunction: (data) =>
      organizationGateway.create({
        email: data.email,
        name: data.owner_name,
        password: data.password,
        phone: data.phone,
      }),
    onError: onErrorRequest,
    onSuccess: () => {
      addToast({
        message: t("register.form.success.title"),
        type: "success",
      });
      navigate(ROUTES.signIn.path);
    },
  });

  function onErrorRequest(error: unknown) {
    if (error instanceof ConflictError) {
      setFormError("email", {
        message: t("validation.email_conflict"),
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
        message: t("register.form.error.validation.title"),
        type: "error",
      });
      return;
    }

    addToast({
      message: t("register.form.error.internal.title"),
      type: "error",
    });
  }

  return {
    errors: formErrors,
    isLoading,
    register,
    onCreateOrganizationFormSubmit: handleSubmit,
  };
}
