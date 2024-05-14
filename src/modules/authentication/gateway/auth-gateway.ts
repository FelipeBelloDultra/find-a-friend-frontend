export interface AuthGateway {
  authenticate: () => Promise<string>;
}
