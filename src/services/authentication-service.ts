import type { HttpProvider } from "~/providers/http-provider";

export interface AuthenticationServiceProps {
  authenticate: () => Promise<string>;
}

export class AuthenticationService implements AuthenticationServiceProps {
  constructor(private readonly httpProvider: HttpProvider) {}

  public async authenticate(): Promise<string> {
    return await this.httpProvider.get("http://localhost:3000/example");
  }
}
