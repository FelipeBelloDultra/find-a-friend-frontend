import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { t } from "i18next";

import { UnauthorizedHttpError, ValidationHttpError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";

import { schemas } from "./schemas";
import { useOrganization } from "./use-organization";

import type { CreateOrganizationProps } from "../gateway/org-gateway";
import type { z } from "zod";

type CreateOrganizationFormSchema = z.infer<typeof schemas.createOrgnanization>;

export function useCreateOrganization() {
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<CreateOrganizationFormSchema>({
    resolver: zodResolver(schemas.createOrgnanization),
  });
  const { addToast } = useToast();
  const { organizationGateway } = useOrganization();
  const { mutate, isPending } = useMutation({
    mutationFn: (data: CreateOrganizationProps) =>
      organizationGateway.create({
        email: data.email,
        logoUrl: data.logoUrl,
        name: data.name,
        password: data.password,
        phone: data.phone,
      }),
    onSuccess: onSuccessRequest,
    onError: onErrorRequest,
  });

  function onSuccessRequest() {
    addToast({
      message: t("login.form.success.title"),
      type: "success",
    });
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

  function onCreateOrganizationFormSubmit() {
    return handleSubmit((data) =>
      mutate({
        logoUrl: "",
        name: data.owner_name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      }),
    );
  }

  return {
    errors,
    isLoading: isPending,
    register,
    onCreateOrganizationFormSubmit,
  };
}
