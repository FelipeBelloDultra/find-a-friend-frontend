export interface AuthenticationGateway {
  authenticate: () => Promise<string>;
}
