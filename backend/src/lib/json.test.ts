import assert from 'node:assert/strict';
import test from 'node:test';
import { jsonReplacer } from './json';

test('serializes BigInt values as decimal strings', () => {
  assert.equal(jsonReplacer('id', 12345678901234567890n), '12345678901234567890');
});

test('does not change non-BigInt JSON values', () => {
  assert.deepEqual(jsonReplacer('value', { count: 1 }), { count: 1 });
});
