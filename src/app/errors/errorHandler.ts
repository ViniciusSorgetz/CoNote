import { NextResponse } from "next/server";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
  ServiceError,
} from "./errors";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";
import { ZodError } from "zod";

export default function errorHandler(error: unknown) {
  if (
    error instanceof InternalServerError ||
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ServiceError
  ) {
    console.error(error);
    return NextResponse.json(error, { status: error.statusCode });
  }

  if (error instanceof PrismaClientInitializationError) {
    const serviceError = new ServiceError();
    console.error(serviceError);
    return NextResponse.json(serviceError, { status: serviceError.statusCode });
  }

  if (error instanceof ZodError) {
    const validationError = new ValidationError({
      message: "Invalid request data",
      cause: error,
      issues: error.issues,
    });
    console.error(validationError);
    return NextResponse.json(validationError, {
      status: validationError.statusCode,
    });
  }

  const internalError = new InternalServerError({ cause: error });
  console.error(internalError);
  return NextResponse.json(internalError, {
    status: internalError.statusCode | 500,
  });
}
