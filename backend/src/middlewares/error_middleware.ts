import e from 'express';
import { ConflictError, Errors } from '../errors/errors';

const error_middleware = (err: unknown, _req: e.Request, res: e.Response, next: e.NextFunction) => {
  if (res.headersSent) {
    next(err);
    return;
  }

  if (err instanceof Errors) {
    res.status(err.status).json({
      status: err.status,
      message: err.message
    });
    return;
  }

  if (typeof err === 'object' && err !== null && 'code' in err && err.code === 'P2002') {
    const conflict = new ConflictError('A record with these values already exists');
    res.status(conflict.status).json({
      status: conflict.status,
      message: conflict.message
    });
    return;
  }

  console.error(err);
  res.status(500).json({
      status: 500,
      message: 'Internal Server Error',
    });
}
export { error_middleware };
