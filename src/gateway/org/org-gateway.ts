export interface CreateOrganizationProps {
  name: string;
  email: string;
  phone: string;
  password: string;
}

export interface OrganizationGateway {
  create: (data: CreateOrganizationProps) => Promise<void>;
}
