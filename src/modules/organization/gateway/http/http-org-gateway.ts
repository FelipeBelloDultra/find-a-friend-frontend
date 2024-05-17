import type { HttpClient } from "~/infra/http/http-client";
import type { CreateOrganizationProps, OrganizationGateway } from "../org-gateway";

export class HttpAuthGateway implements OrganizationGateway {
  constructor(private readonly httpClient: HttpClient) {}

  public async create(data: CreateOrganizationProps): Promise<void> {
    await this.httpClient.post<{ token: string }, CreateOrganizationProps>("/api/org", data);
  }
}
