import { Request, Response, NextFunction } from "express";
import { AnyZodObject } from "zod";
import ValidationError from "../../domain/errors/validation-error";

export const validateQuery = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.parseAsync(req.query);
      next();
    } catch (error) {
      console.error('Validation error:', error);
      next(new ValidationError("Invalid query parameters"));
    }
  };
}; 