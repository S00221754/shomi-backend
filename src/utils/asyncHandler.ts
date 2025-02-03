import { Request, Response, NextFunction, RequestHandler } from "express";

// This function is a wrapper for async functions that catch any errors that occur during the execution of the function.
const asyncHandler = (fn: RequestHandler) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

export default asyncHandler;
