import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SIGN_IN_ROUTE } from "~/router/constants";
import { useAuth } from "~/modules/authentication/hooks/use-auth";

import type { FormEvent } from "react";

export function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { authGateway } = useAuth();

  async function handleSubmitForm(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await authGateway.authenticate();

    console.log(result);
  }

  return (
    <form onSubmit={handleSubmitForm}>
      <span className="flex flex-col gap-4">
        <Input.Container>
          <Input.Label to="owner_name">{t("register.form.input_owner_name.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_owner_name.placeholder")}
            type="text"
            name="owner_name"
          />
          <Input.Error />
        </Input.Container>

        <Input.Container>
          <Input.Label to="email">{t("register.form.input_email.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_email.placeholder")}
            type="email"
            name="email"
          />
          <Input.Error />
        </Input.Container>

        <Input.Container>
          <Input.Label to="phone">{t("register.form.input_phone.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_phone.placeholder")}
            type="text"
            name="phone"
          />
          <Input.Error />
        </Input.Container>

        <Input.Container>
          <Input.Label to="password">{t("register.form.input_password.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_password.placeholder")}
            type="password"
            name="password"
          />
          <Input.Error />
        </Input.Container>

        <Input.Container>
          <Input.Label to="password_confirmation">
            {t("register.form.input_password_confirmation.label")}
          </Input.Label>
          <Input.Root
            placeholder={t("register.form.input_password_confirmation.placeholder")}
            type="password"
            name="password_confirmation"
          />
          <Input.Error />
        </Input.Container>
      </span>

      <span className="flex flex-col gap-4 mt-11">
        <Button type="submit">{t("register.form.btn_submit")}</Button>

        <Button
          variant="secondary"
          type="button"
          onClick={() => navigate(SIGN_IN_ROUTE)}
        >
          {t("register.form.btn_has_account")}
        </Button>
      </span>
    </form>
  );
}
