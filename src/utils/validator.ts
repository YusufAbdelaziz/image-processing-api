import { ValidationChain, query, validationResult } from "express-validator";
import { Request, Response, NextFunction } from "express";

type Error = {
  errors: string[];
};

/**
 * @description Validates the query parameters.
 * @param {Request} req - The request received from the user
 * @param {Response} res - The response which is sent to the client.
 */
function validatorMiddleware(req: Request, res: Response, next: NextFunction): void {
  const errorJson = generateErrorString(req);
  if (errorJson.errors.length != 0) {
    res.status(400).send(JSON.stringify(errorJson)).end();
  } else {
    next();
  }
}

/**
 * @description Provides the validation rules for each parameter.
 * @returns {ValidationChain[]} list of validation chains that act like a list of middleware to process each query
 * parameter.
 */

function validateQueryParameters(): ValidationChain[] {
  return [
    query("width").isInt({ min: 1 }).withMessage("Provide a non-negative integer (> 0) for the width"),
    query("height").isInt({ min: 1 }).withMessage("Provide a non-negative integer (> 0) for the height"),
    query("fileName").isString().withMessage("Please provide a file name")
  ];
}
/**
 * @description Generates a list of errors if at least one parameter doesn't meet its requirements.
 * @param {Request} req : The request received from the client.
 * @returns {Error} returns an object that has a list of errors.
 */
function generateErrorString(req: Request): Error {
  const errors = validationResult(req);
  const errorArr = [];
  for (const error of errors["errors"]) {
    errorArr.push(error["msg"]);
  }
  return { errors: errorArr };
}

export { validateQueryParameters, validatorMiddleware };
