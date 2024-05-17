import { HttpStatusCode } from "../http-status-code";
import { HttpError } from "../http-error";

export class UnauthorizedError extends HttpError {
  constructor() {
    super(HttpStatusCode.Unauthorized, "Unauthorized.");

    this.name = UnauthorizedError.name;
  }
}
