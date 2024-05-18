import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { ROUTES } from "~/router/constants";

import { useSignIn } from "../hooks/use-sign-in";

const SIGN_IN_INPUTS = [
  {
    id: Math.random() + Date.now(),
    field: "email",
    input_type: "email",
  },
  {
    id: Math.random() + Date.now(),
    field: "password",
    input_type: "password",
  },
] as const;

export function LoginForm() {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const { errors, register, onSignInFormSubmit, isLoading } = useSignIn();

  return (
    <form onSubmit={onSignInFormSubmit}>
      <span className="flex flex-col gap-4">
        {SIGN_IN_INPUTS.map(({ id, field, input_type }) => (
          <Input.Container key={id}>
            <Input.Label to={field}>{t(`login.form.input_${field}.label`)}</Input.Label>
            <Input.Root
              placeholder={t(`login.form.input_${field}.placeholder`)}
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
          type="submit"
          isLoading={isLoading}
        >
          {t("login.form.btn_submit")}
        </Button>

        <Button
          isDisabled={isLoading}
          onClick={() => navigate(ROUTES.signUp.path)}
          variant="secondary"
          type="button"
        >
          {t("login.form.btn_register")}
        </Button>
      </span>
    </form>
  );
}
