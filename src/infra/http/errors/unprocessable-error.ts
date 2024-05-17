import { HttpStatusCode } from "../http-status-code";
import { HttpError } from "../http-error";

import type { ValidationIssues } from "../http-error";

export class UnprocessableError extends HttpError {
  public readonly issues: ValidationIssues;

  constructor(issues: ValidationIssues) {
    super(HttpStatusCode.UnprocessableEntity, "Validation error.");

    this.name = UnprocessableError.name;
    this.issues = issues;
  }
}
