import { ValidationError } from "express-validator";

interface ErrorEntity {
  type: string,
  value: string,
  msg: string,
  path: string,
  location: string,
}

export interface BasicErrorResponse {
  errors: ValidationError[],
}