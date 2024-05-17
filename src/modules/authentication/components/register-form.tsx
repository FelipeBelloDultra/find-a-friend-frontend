import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { SIGN_IN_ROUTE } from "~/router/constants";

import { useSignUp } from "../hooks/use-sign-up";

export function RegisterForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { errors, register, onSignUpFormSubmit, isLoading } = useSignUp();

  return (
    <form onSubmit={onSignUpFormSubmit()}>
      <span className="flex flex-col gap-4">
        <Input.Container>
          <Input.Label to="owner_name">{t("register.form.input_owner_name.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_owner_name.placeholder")}
            type="text"
            hasError={!!errors.owner_name?.message}
            {...register("owner_name")}
          />
          <Input.Error message={errors.owner_name?.message} />
        </Input.Container>

        <Input.Container>
          <Input.Label to="email">{t("register.form.input_email.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_email.placeholder")}
            type="email"
            hasError={!!errors.email?.message}
            {...register("email")}
          />
          <Input.Error message={errors.email?.message} />
        </Input.Container>

        <Input.Container>
          <Input.Label to="phone">{t("register.form.input_phone.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_phone.placeholder")}
            type="text"
            hasError={!!errors.phone?.message}
            {...register("phone")}
          />
          <Input.Error message={errors.phone?.message} />
        </Input.Container>

        <Input.Container>
          <Input.Label to="password">{t("register.form.input_password.label")}</Input.Label>
          <Input.Root
            placeholder={t("register.form.input_password.placeholder")}
            type="password"
            hasError={!!errors.password?.message}
            {...register("password")}
          />
          <Input.Error message={errors.password?.message} />
        </Input.Container>

        <Input.Container>
          <Input.Label to="password_confirmation">
            {t("register.form.input_password_confirmation.label")}
          </Input.Label>
          <Input.Root
            placeholder={t("register.form.input_password_confirmation.placeholder")}
            type="password"
            hasError={!!errors.password_confirmation?.message}
            {...register("password_confirmation")}
          />
          <Input.Error message={errors.password_confirmation?.message} />
        </Input.Container>
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
          onClick={() => navigate(SIGN_IN_ROUTE)}
        >
          {t("register.form.btn_has_account")}
        </Button>
      </span>
    </form>
  );
}
