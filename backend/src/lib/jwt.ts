import { InternalServerError } from "../errors/errors";

const getJwtSecret = (): string => {
  const secret = process.env.JWT_SECRET;
  if (!secret) {
    throw new InternalServerError("JWT_SECRET must be configured");
  }
  return secret;
};

export { getJwtSecret };
