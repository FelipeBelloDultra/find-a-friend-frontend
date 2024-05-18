import type { AxiosInstance, AxiosResponse } from "axios";

export interface HttpClient {
  get: <Response>(url: string) => Promise<Response>;
  post: <Response = void, RequestBody = unknown>(
    url: string,
    data?: RequestBody,
  ) => Promise<Response>;
  patch: <Response = void, RequestBody = unknown>(
    url: string,
    data?: RequestBody,
  ) => Promise<Response>;
  setHeader: (key: string, value: string) => void;
  instance: AxiosInstance;
  addResponseInterceptor: ({ onFulfilled, onRejected }: ResponseInterceptor) => number;
  removeResponseInterceptor: (interceptorId: number) => void;
}

export type ResponseInterceptor = {
  onFulfilled(data: AxiosResponse): AxiosResponse | Promise<AxiosResponse>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onRejected(error: any): any | Promise<any>;
};
