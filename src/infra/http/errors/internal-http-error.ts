import { HttpError } from "./http-error";

export class InternalHttpError extends HttpError {
  constructor() {
    super(500, "Validation error..");

    this.name = InternalHttpError.name;
  }
}
