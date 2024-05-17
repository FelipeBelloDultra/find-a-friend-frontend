import { t } from "i18next";
import { z } from "zod";

export const schemas = {
  signIn: z.object({
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
  }),
};
