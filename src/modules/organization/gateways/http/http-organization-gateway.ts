import { Endpoints } from "~/infra/http/endpoints";

import type { HttpClient } from "~/infra/http/http-client";
import type { CreateOrganizationProps, OrganizationGateway } from "../organization-gateway";

export class HttpOrganizationGateway implements OrganizationGateway {
  constructor(private readonly httpClient: HttpClient) {}

  public async create(data: CreateOrganizationProps): Promise<void> {
    await this.httpClient.post<{ token: string }, CreateOrganizationProps>(
      Endpoints.CreateOrganization,
      data,
    );
  }
}
