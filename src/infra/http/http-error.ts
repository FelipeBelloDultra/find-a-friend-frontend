import type { AxiosRequestConfig } from "axios";

export type ValidationIssues = {
  [key: string]: Array<string>;
};

export class HttpError extends Error {
  public readonly statusCode: number;
  public requestConfig: AxiosRequestConfig | undefined = undefined;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.name = HttpError.name;
  }

  public setRequestConfig(requestConfig: AxiosRequestConfig) {
    this.requestConfig = requestConfig;
  }
}
