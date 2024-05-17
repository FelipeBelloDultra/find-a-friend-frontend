export interface AuthenticateProps {
  email: string;
  password: string;
}

export interface RegisterProps {
  name: string;
  email: string;
  password: string;
  phone: string;
  logoUrl: string;
}

export interface AuthGateway {
  authenticate: ({ email, password }: AuthenticateProps) => Promise<string>;
  register: (data: RegisterProps) => Promise<void>;
}
