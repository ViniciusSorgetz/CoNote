import { ZodIssue } from "zod";

export class InternalServerError extends Error {
  statusCode: number;
  constructor({ cause }: { cause: unknown }) {
    super("Something went wrong in the server", { cause });
    this.statusCode = 500;
  }
  toJSON() {
    return {
      error: "InternalServerError",
      message: this.message,
      action: "Please try again later.",
      status_code: this.statusCode,
    };
  }
}

export class ServiceError extends Error {
  statusCode: number;
  constructor() {
    super("Error in using services");
    this.statusCode = 503;
  }
  toJSON() {
    return {
      error: "ServiceError",
      message: this.message,
      action: "Please try again in a few moments",
      status_code: this.statusCode,
    };
  }
}

export class ValidationError extends Error {
  statusCode: number;
  issues?: ZodIssue[];
  constructor({
    message,
    cause,
    issues,
  }: {
    message: string;
    cause?: unknown;
    issues?: ZodIssue[];
  }) {
    super(message, {
      cause: cause && cause,
    });
    this.statusCode = 400;
    this.issues = issues;
  }
  toJSON() {
    return {
      error: "ValidationError",
      message: this.message,
      action: "Please check if the request data is correct.",
      issues: this.issues && this.issues,
      status_code: this.statusCode,
    };
  }
}

export class NotFoundError extends Error {
  statusCode: number;
  constructor({ message }: { message: string }) {
    super(message);
    this.statusCode = 404;
  }
  toJSON() {
    return {
      error: "NotFoundError",
      message: this.message,
      action: "Check if the request data is correct.",
      status_code: this.statusCode,
    };
  }
}
