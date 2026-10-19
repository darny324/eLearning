import { Request, Response, NextFunction } from "express";
import { AuthorizationError } from "../errors/errors";

const instructor_middleware = (req: Request, _res: Response, next: NextFunction) => {
  if (req.body.user?.type !== "instructor") {
    throw new AuthorizationError("Instructor access is required");
  }
  next();
};

export { instructor_middleware };
