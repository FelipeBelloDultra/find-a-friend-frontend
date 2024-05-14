export class UnauthorizedHttpError extends Error {
  public readonly statusCode: number;

  constructor() {
    super("Unauthorized.");

    this.name = UnauthorizedHttpError.name;
    this.statusCode = 401;
  }
}
