import { t } from "i18next";
import { z } from "zod";

export const schemas = {
  createOrgnanization: z
    .object({
      owner_name: z
        .string()
        .min(
          6,
          t("validation.min.owner_name", {
            minSize: 6,
          }),
        )
        .max(
          255,
          t("validation.max.owner_name", {
            maxSize: 255,
          }),
        )
        .regex(/[A-Z][a-z]* [A-Z][a-z]*/, t("validation.format.owner_name")),
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
      phone: z
        .string()
        .regex(
          /^((\+?55 ?[1-9]{2} ?)|(\+?55 ?\([1-9]{2}\) ?)|(0[1-9]{2} ?)|(\([1-9]{2}\) ?)|([1-9]{2} ?))((\d{4}-?\d{4})|(9[1-9]{1}\d{3}-?\d{4}))$/,
          t("validation.format.phone"),
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
      password_confirmation: z.string(),
    })
    .refine((data) => data.password === data.password_confirmation, {
      message: t("validation.format.password_confirmation"),
      path: ["password_confirmation"],
    }),
};
