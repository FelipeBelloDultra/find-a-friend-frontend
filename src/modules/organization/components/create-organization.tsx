import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ROUTES } from "~/router/constants";

import { useCreateOrganization } from "../hooks/use-create-organization";

const CREATE_ORGANIZATION_INPUTS = [
  {
    id: Math.random() + Date.now(),
    field: "owner_name",
    input_type: "text",
  },
  {
    id: Math.random() + Date.now(),
    field: "email",
    input_type: "email",
  },
  {
    id: Math.random() + Date.now(),
    field: "phone",
    input_type: "text",
  },
  {
    id: Math.random() + Date.now(),
    field: "password",
    input_type: "password",
  },
  {
    id: Math.random() + Date.now(),
    field: "password_confirmation",
    input_type: "password",
  },
] as const;

export function CreateOrganization() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { errors, register, onCreateOrganizationFormSubmit, isLoading } = useCreateOrganization();

  return (
    <form onSubmit={onCreateOrganizationFormSubmit}>
      <span className="flex flex-col gap-4">
        {CREATE_ORGANIZATION_INPUTS.map(({ id, field, input_type }) => (
          <Input.Container key={id}>
            <Input.Label to={field}>{t(`register.form.input_${field}.label`)}</Input.Label>
            <Input.Root
              placeholder={t(`register.form.input_${field}.placeholder`)}
              type={input_type}
              hasError={!!errors[field]?.message}
              {...register(field)}
            />
            <Input.Error message={errors[field]?.message} />
          </Input.Container>
        ))}
      </span>

      <span className="flex flex-col gap-4 mt-11">
        <Button
          isLoading={isLoading}
          type="submit"
        >
          {t("register.form.btn_submit")}
        </Button>

        <Button
          variant="secondary"
          type="button"
          isDisabled={isLoading}
          onClick={() => navigate(ROUTES.signIn.path)}
        >
          {t("register.form.btn_has_account")}
        </Button>
      </span>
    </form>
  );
}
