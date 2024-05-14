import type { HttpProvider } from "~/providers/http-provider";

export class HttpClient implements HttpProvider {
  async get(url: string): Promise<string> {
    return await new Promise((r) => setTimeout(() => r(url), 200));
  }
}
