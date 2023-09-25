import { describe, expect, test } from 'bun:test';
import { FieldValidatorPrivateFixtures as FieldValidatorFixtures } from './test-fixtures';
import { TrimStringLeadRule } from '../../../../src/domain/validator/rules/lead-rules/string/trim';
import { LiteralFieldValidator } from '../../../../src/domain/validator/field-validator/literal-field-validator';


describe('nullable validate address', () => {
  const sut = FieldValidatorFixtures.contactAttrsValidatormap.address;

  test('fail, passed as undefined or null parameter', () => {
    const valuesToTest = [undefined, null];

    valuesToTest.forEach(value => {
      const result = sut.validate(value);
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        address: [
          {
            text: "Значение не должно быть undefined или null",
            hint: {}
          }
        ]
      });
    });
  });
});


describe('nullable validate email', () => {
  const sut = FieldValidatorFixtures.contactAttrsValidatormap.email;

  test('fail, passed as undefined or null parameter', () => {
    const valuesToTest = [undefined, null];

    valuesToTest.forEach(value => {
      const result = sut.validate(value);
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        email: [
          {
            text: "Значение не должно быть undefined или null",
            hint: {}
          }
        ]
      });
    });
  });
});

describe('nullable validate noOutField', () => {
  const sut = FieldValidatorFixtures.contactAttrsValidatormap.noOutField;

  test('fail, passed as undefined or null parameter', () => {
    const valuesToTest = [undefined, null];

    valuesToTest.forEach(value => {
      const result = sut.validate(value);
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        noOutField: [
          {
            text: "Значение не должно быть undefined или null",
            hint: {}
          }
        ]
      });
    });
  });
});


describe('nullable validate fieldName', () => {
  const sut = new LiteralFieldValidator('fieldName', 'string', true, { isArray: false }, [], [new TrimStringLeadRule()]);

  test('fail, passed as undefined or null parameter', () => {
    const valuesToTest = [undefined, null];

    valuesToTest.forEach(value => {
      const result = sut.validate(value);
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        fieldName: [
          {
            text: "Значение не должно быть undefined или null",
            hint: {}
          }
        ]
      });
    });
  });
});




