import { useTranslation } from "react-i18next";

import { FloatImgBackground } from "~/components/float-img-background";

import { LoginForm } from "./components/login-form";

export function SignIn() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl w-full mx-auto px-8">
      <section className="flex justify-between gap-32 py-20">
        <FloatImgBackground />

        <article className="flex-1 pr-28">
          <section className="flex flex-col h-full">
            <div className="min-h-[calc(500px/2)] flex items-center">
              <h1 className="my-auto font-bold text-6xl -tracking-[2px]">{t("login.welcome")}</h1>
            </div>

            <LoginForm />
          </section>
        </article>
      </section>
    </div>
  );
}
