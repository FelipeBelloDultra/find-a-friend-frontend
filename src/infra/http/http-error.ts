export type ValidationIssues = {
  [key: string]: Array<string>;
};

export class HttpError extends Error {
  public readonly statusCode: number;

  constructor(statusCode: number, message: string) {
    super(message);

    this.statusCode = statusCode;
    this.name = HttpError.name;
  }
}
