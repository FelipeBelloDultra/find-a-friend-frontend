import { InternalHttpError, UnauthorizedHttpError, ValidationHttpError } from "../errors";

import type { ValidationIssues } from "../errors/validation-http-error";
import type { HttpClient } from "../http-client";
interface HeaderOptions {
  [key: string]: string;
}

interface HttpOptions<RequestBody = unknown> {
  body?: RequestBody;
  headers?: HeaderOptions;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export class HttpFetchAdapter implements HttpClient {
  private readonly BASE_URL = import.meta.env.VITE_API_URL;

  public async get<Response>(url: string): Promise<Response> {
    return await this.makeRequest<void, Response>(url, {
      method: "GET",
    });
  }

  public async post<Response = void, RequestBody = unknown>(
    url: string,
    data: RequestBody,
  ): Promise<Response> {
    return await this.makeRequest(url, {
      method: "POST",
      body: data,
    });
  }

  private async makeRequest<RequestBody = void, Response = unknown>(
    path: string,
    options: HttpOptions<RequestBody>,
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
      credentials: "include",
    });

    if (response.ok) {
      const contentType = response.headers.get("Content-Type");
      if (contentType?.includes("application/json")) {
        return (await response.json()) as Response;
      }

      return void 0 as Response;
    }

    if (response.status === 401) {
      throw new UnauthorizedHttpError();
    }

    if (response.status === 422) {
      const data = (await response.json()) as {
        message: string;
        issues: ValidationIssues;
      };

      throw new ValidationHttpError(data.issues);
    }

    if (response.status === 500) {
      throw new InternalHttpError();
    }

    throw new Error();
  }
}
