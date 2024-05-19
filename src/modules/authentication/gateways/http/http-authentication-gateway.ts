import { OrganizationMapper } from "~/modules/organization/mappers/organization-mapper";

import type { HttpClient } from "~/infra/http/http-client";
import type { AuthenticateProps, AuthenticationGateway } from "../authentication-gateway";
import type {
  DomainOrganization,
  PersistenceOrganization,
} from "~/modules/organization/mappers/organization-mapper";

export class HttpAuthenticationGateway implements AuthenticationGateway {
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

  public async me(token?: string): Promise<DomainOrganization> {
    if (token) {
      this.httpClient.setHeader("Authorization", `Bearer ${token}`);
    }
    const org = await this.httpClient.get<PersistenceOrganization>("/api/auth/me");
    const toDomainOrg = OrganizationMapper.toDomain(org);

    return toDomainOrg;
  }
}
