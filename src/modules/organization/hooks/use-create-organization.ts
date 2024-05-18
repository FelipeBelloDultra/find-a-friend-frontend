import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { t } from "i18next";

import { ConflictError, UnprocessableError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";
import { SIGN_IN_ROUTE } from "~/router/constants";

import { schemas } from "./schemas";
import { useOrganization } from "./use-organization";

import type { z } from "zod";

type CreateOrganizationFormSchema = z.infer<typeof schemas.createOrgnanization>;

export function useCreateOrganization() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<CreateOrganizationFormSchema>({
    resolver: zodResolver(schemas.createOrgnanization),
  });
  const navigate = useNavigate();
  const { addToast } = useToast();
  const { organizationGateway } = useOrganization();

  function onErrorRequest(error: unknown) {
    if (error instanceof ConflictError) {
      setError("email", {
        message: t("validation.email_conflict"),
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

  async function onCreateOrganizationFormSubmit(data: CreateOrganizationFormSchema) {
    try {
      await organizationGateway.create({
        email: data.email,
        name: data.owner_name,
        password: data.password,
        phone: data.phone,
      });

      addToast({
        message: t("register.form.success.title"),
        type: "success",
      });
      navigate(SIGN_IN_ROUTE);
    } catch (error) {
      onErrorRequest(error);
    }
  }

  return {
    errors,
    isLoading: isSubmitting,
    register,
    onCreateOrganizationFormSubmit: handleSubmit(onCreateOrganizationFormSubmit),
  };
}
