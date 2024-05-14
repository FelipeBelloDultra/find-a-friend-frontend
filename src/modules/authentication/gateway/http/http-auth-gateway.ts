import type { HttpProvider } from "~/providers/http-provider";
import type { AuthGateway } from "../auth-gateway";

export class HttpAuthGateway implements AuthGateway {
  constructor(private readonly httpProvider: HttpProvider) {}

  public async authenticate(): Promise<string> {
    return await this.httpProvider.get("http://localhost:3000/example");
  }
}
