import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { t } from "i18next";

import { UnauthorizedHttpError } from "~/infra/http/errors/unauthorized-http-error";
import { ValidationHttpError } from "~/infra/http/errors/validation-http-error";

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
  const { authGateway } = useAuth();

  async function submitForm(data: SignInFormSchema) {
    try {
      const value = await authGateway.authenticate(data);
      console.log(value);
    } catch (error) {
      if (error instanceof UnauthorizedHttpError) {
        console.log(error);
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
        return;
      }
    }
  }

  function onSignInFormSubmit() {
    return handleSubmit(submitForm);
  }

  return {
    form: {
      errors,
      register,
      onSignInFormSubmit,
    },
  };
}
