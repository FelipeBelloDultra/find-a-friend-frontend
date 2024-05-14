import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SIGN_UP_ROUTE } from "~/router/constants";

import { useSignIn } from "../hooks/use-sign-in";

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const {
    form: { errors, register, onSignInFormSubmit },
  } = useSignIn();

  return (
    <form onSubmit={onSignInFormSubmit()}>
      <span className="flex flex-col gap-4">
        <Input.Container>
          <Input.Label to="email">{t("login.form.input_email.label")}</Input.Label>
          <Input.Root
            placeholder={t("login.form.input_email.placeholder")}
            type="email"
            hasError={!!errors.email?.message}
            {...register("email")}
          />
          <Input.Error message={errors.email?.message} />
        </Input.Container>

        <Input.Container>
          <Input.Label to="password">{t("login.form.input_password.placeholder")}</Input.Label>
          <Input.Root
            placeholder={t("login.form.input_password.placeholder")}
            type="password"
            hasError={!!errors.password?.message}
            {...register("password")}
          />
          <Input.Error message={errors.password?.message} />
        </Input.Container>
      </span>

      <span className="flex flex-col gap-4 mt-11">
        <Button type="submit">{t("login.form.btn_submit")}</Button>

        <Button
          onClick={() => navigate(SIGN_UP_ROUTE)}
          variant="secondary"
          type="button"
        >
          {t("login.form.btn_register")}
        </Button>
      </span>
    </form>
  );
}
