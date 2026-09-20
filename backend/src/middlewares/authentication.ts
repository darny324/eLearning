import { Request, Response, NextFunction } from "express"
import { AuthenticationError } from "../errors/errors";
import jwt, { JwtPayload } from 'jsonwebtoken';

interface UserPayload extends JwtPayload {
  user_id: string,
  name: string
};
const authentication_middleware = (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.headers.authorization;
  if (!authorization?.startsWith("Bearer ")) {
    throw new AuthenticationError("Authorization Format Is Invalid::It must be in the form \"Bearer Token\"");
  }
  const token: string | undefined = authorization.split(' ')[1];
  if (!token) {
    throw new AuthenticationError("Token Must be provided");
  }
  const decoded = jwt.verify(token, process.env.JWT_SECRET as string) as UserPayload;
  if (!decoded) {
    throw new AuthenticationError("Invalid Token");
  }
  req.body.user = decoded;

  next();
}

export { authentication_middleware };
