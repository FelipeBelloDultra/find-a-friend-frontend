import { useNavigate } from "react-router-dom";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function LoginForm() {
  const navigate = useNavigate();

  return (
    <article className="flex-1 pr-28">
      <section className="flex flex-col h-full">
        <div className="min-h-[calc(500px/2)] flex items-center">
          <h1 className="my-auto font-bold text-6xl -tracking-[2px]">Boas-vindas!</h1>
        </div>

        <form>
          <span className="flex flex-col gap-4">
            <Input.Container>
              <Input.Label to="email">Email</Input.Label>
              <Input
                placeholder="nome@email.com"
                type="email"
                name="email"
              />
              <Input.Error />
            </Input.Container>

            <Input.Container>
              <Input.Label to="password">Senha</Input.Label>
              <Input
                placeholder="Sua melhor senha"
                type="password"
                name="password"
              />
              <Input.Error />
            </Input.Container>
          </span>

          <span className="flex flex-col gap-4 mt-11">
            <Button type="submit">Login</Button>

            <Button
              onClick={() => navigate("/register")}
              variant="secondary"
              type="button"
            >
              Cadastrar minha organização
            </Button>
          </span>
        </form>
      </section>
    </article>
  );
}
