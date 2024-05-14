import { UnauthorizedHttpError } from "../errors/unauthorized-http-error";

import type { HttpProvider } from "../http-client";
interface HeaderOptions {
  [key: string]: string;
}

interface HttpOptions<RequestBody = unknown> {
  body?: RequestBody;
  headers?: HeaderOptions;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export class HttpFetchAdapter implements HttpProvider {
  private readonly BASE_URL = import.meta.env.VITE_API_URL;

  public async get<Response>(url: string): Promise<Response> {
    return await this.makeRequest<void, Response>(url, {
      method: "GET",
    });
  }

  public async post<HttpResponse = void, RequestBodyData = unknown>(
    url: string,
    data: RequestBodyData,
  ): Promise<HttpResponse> {
    return await this.makeRequest(url, {
      method: "POST",
      body: data,
    });
  }

  private async makeRequest<HttpRequestBody = void, HttpResponse = unknown>(
    path: string,
    options: HttpOptions<HttpRequestBody>,
  ) {
    const headers = new Headers();

    if (options.body) {
      headers.append("Content-Type", "application/json");
    }

    if (options.headers && Object.keys(options.headers).length > 0) {
      Object.entries(options.headers).forEach(([name, value]) => {
        headers.append(name, value);
      });
    }

    const response = await fetch(`${this.BASE_URL}${path}`, {
      method: options.method,
      body: JSON.stringify(options.body),
      headers,
      credentials: "same-origin",
    });

    if (response.ok) {
      return (await response.json()) as HttpResponse;
    }

    if (response.status === 401) {
      throw new UnauthorizedHttpError();
    }

    throw new Error();
  }
}
