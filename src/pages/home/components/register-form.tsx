import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";

export function RegisterForm() {
  return (
    <article className="flex-1 pr-28">
      <section className="flex flex-col h-full">
        <div className="min-h-[calc(500px/2)] flex items-center">
          <h1 className="my-auto font-bold text-6xl -tracking-[2px]">Cadastre sua organização </h1>
        </div>

        <form>
          <span className="flex flex-col gap-4">
            <Input.Container>
              <Input.Label to="owner_name">Nome do responsável</Input.Label>
              <Input
                placeholder="Antônio Bandeira"
                type="text"
                name="owner_name"
              />
              <Input.Error />
            </Input.Container>

            <Input.Container>
              <Input.Label to="email">Email</Input.Label>
              <Input
                placeholder="Antônio Bandeira"
                type="email"
                name="email"
              />
              <Input.Error />
            </Input.Container>

            <Input.Container>
              <Input.Label to="phone">WhatsApp</Input.Label>
              <Input
                placeholder="+55 (16) 99999-9999"
                type="text"
                name="phone"
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

            <Input.Container>
              <Input.Label to="password_confirmation">Confirmar senha</Input.Label>
              <Input
                placeholder="Confirmar sua melhor senha"
                type="password"
                name="password_confirmation"
              />
              <Input.Error />
            </Input.Container>
          </span>

          <span className="flex flex-col gap-4 mt-11">
            <Button type="submit">Cadastrar</Button>

            <Button
              variant="secondary"
              type="button"
            >
              Já possui conta?
            </Button>
          </span>
        </form>
      </section>
    </article>
  );
}
