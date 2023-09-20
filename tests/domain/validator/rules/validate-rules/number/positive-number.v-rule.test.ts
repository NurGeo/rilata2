import { describe, expect, test } from 'bun:test';
import { PositiveNumberValidationRule } from '../../../../../../src/domain/validator/rules/validate-rules/number/positive-number.v-rule';

describe('Number must be positive', () => {
  test('success, the resulting value is positive', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(10);
    expect(result).toEqual({ behaviour: 'RunNextRule' });
  });
  test('success, resulting value is 0', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(0);
    expect(result).toEqual({ behaviour: 'RunNextRule' });
  });
  test('success, resulting value is infinity', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(Infinity);
    expect(result).toEqual({ behaviour: 'RunNextRule' });
  });
  test('success, resulting value is -0', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(-0);
    expect(result).toEqual({ behaviour: 'RunNextRule' });
  });
  test('failure, resulting value is a negative number', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(-5);
    expect(result).toEqual({
      behaviour: 'SaveErrorAndRunNextRule',
      ruleError: {
        hint: {
          number: 0,
        },
        text: 'Число должно быть позитивным и больше {{number}}',
      },
    });
  });
  test('failure, resulting value is NaN', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(NaN);
    expect(result).toEqual({
      behaviour: 'SaveErrorAndRunNextRule',
      ruleError: {
        hint: {
          number: 0,
        },
        text: 'Число должно быть позитивным и больше {{number}}',
      },
    });
  });
  test('failure, resulting value is a negative Infinity', () => {
    const sut = new PositiveNumberValidationRule();
    const result = sut.validate(-Infinity);
    expect(result).toEqual({
      behaviour: 'SaveErrorAndRunNextRule',
      ruleError: {
        hint: {
          number: 0,
        },
        text: 'Число должно быть позитивным и больше {{number}}',
      },
    });
  });
});
