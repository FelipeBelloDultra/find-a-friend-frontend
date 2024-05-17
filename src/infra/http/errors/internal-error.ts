import { HttpStatusCode } from "../http-status-code";
import { HttpError } from "../http-error";

export class InternalError extends HttpError {
  constructor() {
    super(HttpStatusCode.InternalServerError, "Validation error..");

    this.name = InternalError.name;
  }
}
