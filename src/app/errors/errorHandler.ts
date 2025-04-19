import { NextResponse } from "next/server";
import {
  InternalServerError,
  NotFoundError,
  ValidationError,
  ServiceError,
} from "./errors";
import { PrismaClientInitializationError } from "@prisma/client/runtime/library";

export default function errorHandler(error: unknown) {
  if (
    error instanceof InternalServerError ||
    error instanceof ValidationError ||
    error instanceof NotFoundError ||
    error instanceof ServiceError
  ) {
    console.error(error);
    return NextResponse.json(error, { status: error.statusCode | 500 });
  }

  if (error instanceof PrismaClientInitializationError) {
    const serviceError = new ServiceError();
    console.error(serviceError);
    return NextResponse.json(serviceError, { status: serviceError.statusCode });
  }

  const internalError = new InternalServerError(error);
  return NextResponse.json(internalError, {
    status: internalError.statusCode | 500,
  });
}
