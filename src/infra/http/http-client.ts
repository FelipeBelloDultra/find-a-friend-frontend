export interface HttpProvider {
  get: <HttpResponse>(url: string) => Promise<HttpResponse>;
  post: <HttpResponse = void, RequestBodyData = unknown>(
    url: string,
    data: RequestBodyData,
  ) => Promise<HttpResponse>;
}
