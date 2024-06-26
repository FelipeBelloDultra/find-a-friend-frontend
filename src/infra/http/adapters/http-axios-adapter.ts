import axios, { AxiosError } from "axios";

import {
  ConflictError,
  InternalError,
  UnauthorizedError,
  UnauthorizedRefreshTokenError,
  UnprocessableError,
} from "../errors";
import { HttpStatusCode } from "../http-status-code";
import { Endpoints } from "../endpoints";

import type { HttpClient, ResponseInterceptor } from "../http-client";

interface Options<RequestBody = unknown> {
  body?: RequestBody;
  headers?: {
    [key: string]: string;
  };
  method: "GET" | "POST" | "PATCH";
}

export class HttpAxiosAdapter implements HttpClient {
  public readonly instance = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
  });

  constructor() {
    this.addResponseInterceptor({
      onFulfilled: (response) => response.data,
      onRejected: (error) => {
        const errorInstance = this.handleAxiosError(error);

        if (error.config) {
          errorInstance.setRequestConfig(error.config);
        }

        return Promise.reject(errorInstance);
      },
    });
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

  public async patch<Response = void, RequestBody = unknown>(
    url: string,
    data: RequestBody,
  ): Promise<Response> {
    return this.makeRequest<RequestBody, Response>(url, {
      method: "PATCH",
      body: data,
    });
  }

  public setHeader(key: string, value: string): void {
    this.instance.defaults.headers[key] = value;
  }

  public addResponseInterceptor({ onFulfilled, onRejected }: ResponseInterceptor) {
    return this.instance.interceptors.response.use(onFulfilled, onRejected);
  }

  public removeResponseInterceptor(interceptorId: number): void {
    this.instance.interceptors.response.eject(interceptorId);
  }

  public setBearerToken(token: string): void {
    this.setHeader("Authorization", `Bearer ${token}`);
  }

  private async makeRequest<RequestBody, Response>(path: string, options: Options<RequestBody>) {
    const response = await this.instance<RequestBody, Response>({
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
      if (error.config?.url === Endpoints.RefreshToken) {
        return new UnauthorizedRefreshTokenError();
      }

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

    return new InternalError();
  }
}
