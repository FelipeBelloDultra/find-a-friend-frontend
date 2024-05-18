import { useNavigate } from "react-router-dom";
import { t } from "i18next";

import { ConflictError, UnprocessableError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";
import { SIGN_IN_ROUTE } from "~/router/constants";
import { useForm } from "~/hooks/use-form";

import { schemas } from "./schemas";
import { useOrganization } from "./use-organization";

import type { z } from "zod";

type CreateOrganizationFormSchema = z.infer<typeof schemas.createOrgnanization>;

export function useCreateOrganization() {
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { organizationGateway } = useOrganization();
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
      navigate(SIGN_IN_ROUTE);
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
