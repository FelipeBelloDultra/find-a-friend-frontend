import { useTranslation } from "react-i18next";

import { FloatImgBackground } from "~/components/float-img-background";

import { RegisterForm } from "./components/register-form";

export function SignUp() {
  const { t } = useTranslation();

  return (
    <div className="max-w-7xl w-full mx-auto px-8">
      <section className="flex justify-between gap-32 py-20">
        <article className="flex-1 pl-28">
          <section className="flex flex-col h-full">
            <div className="min-h-[calc(500px/2)] flex items-center">
              <h1 className="my-auto font-bold text-6xl -tracking-[2px]">
                {t("register.welcome")}
              </h1>
            </div>

            <RegisterForm />
          </section>
        </article>

        <span>
          <FloatImgBackground />
        </span>
      </section>
    </div>
  );
}
