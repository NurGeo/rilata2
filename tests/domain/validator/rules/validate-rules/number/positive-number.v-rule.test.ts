import { describe, expect, test } from 'bun:test';
import { PositiveNumberValidationRule } from '../../../../../../src/domain/validator/rules/validate-rules/number/positive-number.v-rule';

describe('Number must be positive', () => {
  test('success, the resulting value is positive', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(10);
    expect(result).toEqual({ behaviour: 'RunNextRule' });
  });
});
