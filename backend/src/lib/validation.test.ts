import assert from 'node:assert/strict';
import test from 'node:test';
import { isNonNegativeInteger, isPositiveInteger, isUuid } from './validation';

test('accepts UUIDs without restricting UUID version', () => {
  assert.equal(isUuid('123e4567-e89b-12d3-a456-426614174000'), true);
});

test('rejects malformed UUID values', () => {
  assert.equal(isUuid('not-a-uuid'), false);
  assert.equal(isUuid(123), false);
});

test('validates positive and non-negative integers', () => {
  assert.equal(isPositiveInteger(1), true);
  assert.equal(isPositiveInteger(0), false);
  assert.equal(isNonNegativeInteger(0), true);
  assert.equal(isNonNegativeInteger(1.5), false);
});
