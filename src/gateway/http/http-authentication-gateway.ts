import type { HttpProvider } from "~/providers/http-provider";
import type { AuthenticationGateway } from "../authentication-gateway";

export class HttpAuthenticationGateway implements AuthenticationGateway {
  constructor(private readonly httpProvider: HttpProvider) {}

  public async authenticate(): Promise<string> {
    return await this.httpProvider.get("http://localhost:3000/example");
  }
}
