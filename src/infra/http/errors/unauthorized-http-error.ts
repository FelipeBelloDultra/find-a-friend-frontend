import { HttpError } from "./http-error";

export class UnauthorizedHttpError extends HttpError {
  constructor() {
    super(401, "Unauthorized.");

    this.name = UnauthorizedHttpError.name;
  }
}
