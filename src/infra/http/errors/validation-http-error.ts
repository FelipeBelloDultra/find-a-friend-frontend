import { HttpError } from "./http-error";

export interface ValidationIssues {
  [key: string]: Array<string>;
}

export class ValidationHttpError extends HttpError {
  public readonly issues: ValidationIssues;

  constructor(issues: ValidationIssues) {
    super(422, "Validation error.");

    this.name = ValidationHttpError.name;
    this.issues = issues;
  }
}
