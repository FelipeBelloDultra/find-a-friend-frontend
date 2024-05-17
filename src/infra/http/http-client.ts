export interface HttpClient {
  get: <Response>(url: string) => Promise<Response>;
  post: <Response = void, RequestBody = unknown>(
    url: string,
    data: RequestBody,
  ) => Promise<Response>;
}
