import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function LoginForm() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  return (
    <article className="flex-1 pr-28">
      <section className="flex flex-col h-full">
        <div className="min-h-[calc(500px/2)] flex items-center">
          <h1 className="my-auto font-bold text-6xl -tracking-[2px]">{t("login.welcome")}</h1>
        </div>

        <form>
          <span className="flex flex-col gap-4">
            <Input.Container>
              <Input.Label to="email">{t("login.form.input_email.label")}</Input.Label>
              <Input
                placeholder={t("login.form.input_email.placeholder")}
                type="email"
                name="email"
              />
              <Input.Error />
            </Input.Container>

            <Input.Container>
              <Input.Label to="password">{t("login.form.input_password.placeholder")}</Input.Label>
              <Input
                placeholder={t("login.form.input_password.placeholder")}
                type="password"
                name="password"
              />
              <Input.Error />
            </Input.Container>
          </span>

          <span className="flex flex-col gap-4 mt-11">
            <Button type="submit">{t("login.form.btn_submit")}</Button>

            <Button
              onClick={() => navigate("/register")}
              variant="secondary"
              type="button"
            >
              {t("login.form.btn_register")}
            </Button>
          </span>
        </form>
      </section>
    </article>
  );
}
