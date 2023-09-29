import { describe, expect, test } from 'bun:test';
import { ContainedOnlyCharsValidationRule } from '../../../../../../src/domain/validator/rules/validate-rules/string/contained-only-chars';

describe('String must be equal to value', () => {
  test('success, string equal value', () => {
    const sut = new ContainedOnlyCharsValidationRule('123456789');
    const result = sut.validate('123456789');
    expect(result).toEqual({
      behaviour: 'RunNextRule',
    });
  });

  test('success, string equal value', () => {
    const sut = new ContainedOnlyCharsValidationRule('Pasword bomba');
    const result = sut.validate('bomba Pasword');
    expect(result).toEqual({
      behaviour: 'RunNextRule',
    });
  });

  test('success, string equal value', () => {
    const sut = new ContainedOnlyCharsValidationRule('123456789');
    const result = sut.validate('1234567899999');
    expect(result).toEqual({
      behaviour: 'RunNextRule',
    });
  });

  test('success, string equal value', () => {
    const sut = new ContainedOnlyCharsValidationRule('123456789');
    const result = sut.validate('fdsfsdf123456789hdhdfh');
    expect(result).toEqual({
      behaviour: 'RunNextRule',
    });
  });

  test('failure, string is not equal value', () => {
    const sut = new ContainedOnlyCharsValidationRule('hihihaha');
    const result = sut.validate('hihi');
    expect(result).toEqual({
      behaviour: 'SaveErrorAndRunNextRule',
      ruleError: {
        hint: {},
        text: 'Строка должна быть равна {{onlyChars}}',
      },
    });
  });
});
