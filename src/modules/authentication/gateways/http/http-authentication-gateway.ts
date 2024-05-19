import { OrganizationMapper } from "~/modules/organization/mappers";
import { Endpoints } from "~/infra/http/endpoints";

import type { HttpClient } from "~/infra/http/http-client";
import type { AuthenticateProps, AuthenticationGateway } from "../authentication-gateway";
import type { DomainOrganization, PersistenceOrganization } from "~/modules/organization/mappers";

export class HttpAuthenticationGateway implements AuthenticationGateway {
  constructor(private readonly httpClient: HttpClient) {}

  public async authenticate(data: AuthenticateProps): Promise<string> {
    const { token } = await this.httpClient.post<{ token: string }, AuthenticateProps>(
      Endpoints.CreateSession,
      data,
    );

    return token;
  }

  public async refreshToken(): Promise<string> {
    const { token } = await this.httpClient.patch<{ token: string }>(Endpoints.RefreshToken);

    return token;
  }

  public async me(): Promise<DomainOrganization> {
    const org = await this.httpClient.get<PersistenceOrganization>(Endpoints.ShowAuthenticated);
    const toDomainOrg = OrganizationMapper.toDomain(org);

    return toDomainOrg;
  }
}
