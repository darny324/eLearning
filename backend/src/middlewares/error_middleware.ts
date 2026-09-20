import e from 'express';
import { Errors } from '../errors/errors';

const error_middleware = (err: any, req: e.Request, res: e.Response, next: e.NextFunction) => {
  if (err instanceof Errors) {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
  } else if (err instanceof Error) {
    res.json({
      status: 400,
      message: err.message,
    });
  }
}
export { error_middleware };
