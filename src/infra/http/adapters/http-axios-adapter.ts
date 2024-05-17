import axios, { AxiosError } from "axios";

import { ConflictError, InternalError, UnauthorizedError, UnprocessableError } from "../errors";
import { HttpStatusCode } from "../http-status-code";

import type { HttpClient } from "../http-client";

interface HeaderOptions {
  [key: string]: string;
}

interface Options<RequestBody = unknown> {
  body?: RequestBody;
  headers?: HeaderOptions;
  method: "GET" | "POST" | "PUT" | "DELETE";
}

export class HttpAxiosAdapter implements HttpClient {
  private readonly axiosClient = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  constructor() {
    this.axiosClient.interceptors.response.use(
      (response) => response.data,
      async (error) => {
        const errorInstance = this.handleAxiosError(error);

        return Promise.reject(errorInstance);
      },
    );
  }

  public async get<Response>(url: string): Promise<Response> {
    return this.makeRequest<void, Response>(url, {
      method: "GET",
    });
  }

  public async post<Response = void, RequestBody = unknown>(
    url: string,
    data: RequestBody,
  ): Promise<Response> {
    return this.makeRequest<RequestBody, Response>(url, {
      method: "POST",
      body: data,
    });
  }

  private async makeRequest<RequestBody, Response>(path: string, options: Options<RequestBody>) {
    const response = await this.axiosClient<RequestBody, Response>({
      url: path,
      method: options.method,
      data: options.body,
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      withCredentials: true,
    });

    return response;
  }

  private handleAxiosError(error: unknown) {
    if (
      !(error instanceof AxiosError) ||
      !error.response?.status ||
      error.response.status === HttpStatusCode.InternalServerError
    ) {
      return new InternalError();
    }

    if (error.response.status === HttpStatusCode.Unauthorized) {
      return new UnauthorizedError();
    }

    if (error.response.status === HttpStatusCode.UnprocessableEntity) {
      const issues = error?.response?.data?.issues || {};

      return new UnprocessableError(issues);
    }

    if (error.response.status === HttpStatusCode.Conflict) {
      const issues = error?.response?.data?.issues || {};

      return new ConflictError(issues);
    }
  }
}
