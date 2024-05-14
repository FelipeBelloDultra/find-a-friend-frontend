import type { HttpProvider } from "../http-client";

export class HttpFetchAdapter implements HttpProvider {
  async get(url: string): Promise<string> {
    return await new Promise((r) => setTimeout(() => r(url), 200));
  }
}
