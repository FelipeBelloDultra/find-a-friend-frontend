import { ImgBackground } from "./components/img-background";
import { LoginForm } from "./components/login-form";

export function Home() {
  return (
    <div className="max-w-7xl w-full mx-auto px-8">
      <section className="flex justify-between  gap-32  py-20">
        <ImgBackground />
        <LoginForm />
      </section>
    </div>
  );
}
