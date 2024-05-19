import type { DomainOrganization } from "~/modules/organization/mappers/organization-mapper";

export interface AuthenticateProps {
  email: string;
  password: string;
}

export interface AuthenticationGateway {
  authenticate: ({ email, password }: AuthenticateProps) => Promise<string>;
  refreshToken: () => Promise<string>;
  me: (token?: string) => Promise<DomainOrganization>;
}
