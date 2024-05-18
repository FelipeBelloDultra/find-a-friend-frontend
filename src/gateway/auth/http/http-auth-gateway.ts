import { OrgMapper } from "~/mappers/org-mapper";

import type { HttpClient } from "~/infra/http/http-client";
import type { AuthenticateProps, AuthGateway } from "../auth-gateway";
import type { DomainOrg, PersistenceOrg } from "~/mappers/org-mapper";

export class HttpAuthGateway implements AuthGateway {
  constructor(private readonly httpClient: HttpClient) {}

  public async authenticate(data: AuthenticateProps): Promise<string> {
    const { token } = await this.httpClient.post<{ token: string }, AuthenticateProps>(
      "/api/session",
      data,
    );
    this.httpClient.setHeader("Authorization", `Bearer ${token}`);

    return token;
  }

  public async refreshToken(): Promise<string> {
    const { token } = await this.httpClient.patch<{ token: string }>("/api/refresh-token");
    this.httpClient.setHeader("Authorization", `Bearer ${token}`);

    return token;
  }

  public async me(token?: string): Promise<DomainOrg> {
    if (token) {
      this.httpClient.setHeader("Authorization", `Bearer ${token}`);
    }
    const org = await this.httpClient.get<PersistenceOrg>("/api/auth/me");
    const toDomainOrg = OrgMapper.toDomain(org);

    return toDomainOrg;
  }
}
