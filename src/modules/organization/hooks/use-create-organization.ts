import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { t } from "i18next";

import { UnauthorizedError, UnprocessableError } from "~/infra/http/errors";
import { useToast } from "~/hooks/use-toast";
import { SIGN_IN_ROUTE } from "~/router/constants";

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
  const navigate = useNavigate();
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
      message: t("register.form.success.title"),
      type: "success",
    });
    navigate(SIGN_IN_ROUTE);
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
