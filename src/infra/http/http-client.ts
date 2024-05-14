export interface HttpProvider {
  get: (url: string) => Promise<string>;
}
