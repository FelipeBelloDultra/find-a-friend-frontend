import { HttpStatusCode } from "../http-status-code";
import { HttpError } from "../http-error";

import type { ValidationIssues } from "../http-error";

export class ConflictError extends HttpError {
  public readonly issues: ValidationIssues;

  constructor(issues: ValidationIssues) {
    super(HttpStatusCode.Conflict, "Conflict error.");

    this.name = ConflictError.name;
    this.issues = issues;
  }
}
