import assert from 'node:assert/strict';
import { once } from 'node:events';
import express from 'express';
import test from 'node:test';
import { InvalidInputError } from '../errors/errors';
import { error_middleware } from './error_middleware';

test('returns the status code carried by application errors', async (t) => {
  const app = express();
  app.get('/invalid', (_req, _res, next) => next(new InvalidInputError('Invalid input')));
  app.get('/conflict', (_req, _res, next) => next({ code: 'P2002' }));
  app.get('/broken', (_req, _res, next) => next(new Error('Internal detail')));
  app.use(error_middleware);
  const server = app.listen(0);
  await once(server, 'listening');
  t.after(() => new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  }));

  const address = server.address();
  assert.ok(address && typeof address !== 'string');
  const response = await fetch(`http://127.0.0.1:${address.port}/invalid`);
  assert.equal(response.status, 400);
  assert.deepEqual(await response.json(), {
    status: 400,
    message: 'CLIENT ERROR:Invalid input'
  });

  const conflict = await fetch(`http://127.0.0.1:${address.port}/conflict`);
  assert.equal(conflict.status, 409);

  t.mock.method(console, 'error', () => undefined);
  const broken = await fetch(`http://127.0.0.1:${address.port}/broken`);
  assert.equal(broken.status, 500);
  assert.deepEqual(await broken.json(), {
    status: 500,
    message: 'Internal Server Error'
  });
});
