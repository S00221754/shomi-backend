import { Request, Response, NextFunction } from "express";
import createHttpError from "http-errors";


// global error handler that catches all errors
export const errorHandler = (err: any, req: Request, res: Response, next: NextFunction): void => {
    console.error(err.stack);

    if (createHttpError.isHttpError(err)) {
        res.status(err.status).json({ message: err.message });
    } else {
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default errorHandler;
