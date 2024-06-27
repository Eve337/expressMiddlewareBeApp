import { Request, Response } from "express";

const { validationResult } = require('express-validator');

// can be reused by many routes
export const validate = (validations: any) => {
  return async (req: Request, res: Response, next: () => void) => {
    // sequential processing, stops running validations chain if one fails.
    for (const validation of validations) {
      const result = await validation.run(req);
      if (!result.isEmpty()) {
        return res.status(400).json({ errors: result.array() });
      }
    }

    next();
    return;
  };
};