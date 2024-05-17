import type { HttpClient } from "~/infra/http/http-client";
import type { AuthenticateProps, AuthGateway } from "../auth-gateway";

export class HttpAuthGateway implements AuthGateway {
  constructor(private readonly httpClient: HttpClient) {}

  public async authenticate(data: AuthenticateProps): Promise<string> {
    const { token } = await this.httpClient.post<{ token: string }, AuthenticateProps>(
      "/api/session",
      data,
    );

    return token;
  }

  public async refreshToken(): Promise<string> {
    const { token } = await this.httpClient.patch<{ token: string }>("/api/refresh-token");

    return token;
  }
}
