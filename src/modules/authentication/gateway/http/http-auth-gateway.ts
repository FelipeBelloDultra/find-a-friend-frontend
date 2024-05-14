import type { HttpProvider } from "~/infra/http/http-client";
import type { AuthenticateProps, AuthGateway } from "../auth-gateway";

export class HttpAuthGateway implements AuthGateway {
  constructor(private readonly httpProvider: HttpProvider) {}

  public async authenticate(data: AuthenticateProps): Promise<string> {
    const { token } = await this.httpProvider.post<{ token: string }, AuthenticateProps>(
      "/api/session",
      data,
    );

    return token;
  }
}
