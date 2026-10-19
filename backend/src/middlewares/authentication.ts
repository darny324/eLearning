import { Request, Response, NextFunction } from "express";
import { AuthenticationError, InternalServerError } from "../errors/errors";
import jwt, { JwtPayload } from "jsonwebtoken";

interface UserPayload extends JwtPayload {
  user_id: string;
  name: string;
  type: "student" | "instructor";
}

const authentication_middleware = (req: Request, _res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    throw new AuthenticationError("Authorization must use the Bearer token scheme");
  }
  const token = authorization.slice("Bearer ".length).trim();
  if (!token) {
    throw new AuthenticationError("Token must be provided");
  }

  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new InternalServerError("JWT_SECRET must be configured");
  }

  let decoded: string | JwtPayload;
  try {
    decoded = jwt.verify(token, secret);
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      throw new AuthenticationError("Invalid or expired token");
    }
    throw error;
  }

  if (typeof decoded === "string" || !decoded.user_id || !decoded.name ||
    (decoded.type !== "student" && decoded.type !== "instructor")) {
    throw new AuthenticationError("Invalid token");
  }

  req.body = req.body ?? {};
  req.body.user = decoded as UserPayload;
  next();
};

export { authentication_middleware };
