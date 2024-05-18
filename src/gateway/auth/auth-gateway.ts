import type { DomainOrg } from "~/mappers/org-mapper";

export interface AuthenticateProps {
  email: string;
  password: string;
}

export interface AuthGateway {
  authenticate: ({ email, password }: AuthenticateProps) => Promise<string>;
  refreshToken: () => Promise<string>;
  me: (token?: string) => Promise<DomainOrg>;
}
