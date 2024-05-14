import { useTranslation } from "react-i18next";

import { FloatImgBackground } from "~/components/float-img-background";

import { LoginForm } from "./components/login-form";

export function SignIn() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl w-full mx-auto px-8">
      <section className="flex md:justify-between justify-center py-20">
        <span className="md:inline hidden">
          <FloatImgBackground />
        </span>

        <article className="lg:pr-28 md:flex-shrink-0 md:ml-5 w-full md:max-w-[420px] lg:max-w-lg">
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
