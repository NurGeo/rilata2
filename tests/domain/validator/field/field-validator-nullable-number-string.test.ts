import { describe, expect, test } from 'bun:test';
import { DtoFieldValidator } from '../../../../src/domain/validator/field-validator/dto-field-validator';
import { LiteralFieldValidator } from '../../../../src/domain/validator/field-validator/literal-field-validator';
import { GetFieldValidatorDataType } from '../../../../src/domain/validator/field-validator/types';
import { LiteralDataType } from '../../../../src/domain/validator/rules/types';
import { ContainedOnlyCharsValidationRule } from '../../../../src/domain/validator/rules/validate-rules/string/contained-only-chars';
import { FieldValidatorPrivateFixtures, FieldValidatorTestMocksPrivateFixtures } from './test-fixtures';

describe('is required and not required tests', () => {
  const types: [GetFieldValidatorDataType<LiteralDataType>, unknown][] = [
    ['number', 5],
    ['string', 't'],
    ['boolean', false]
  ];
  types.forEach((type) => {
    describe('is requered field validator tests', () => {
      test('success, received string', () => {
        const sut = new LiteralFieldValidator('fieldName', type[0], true, { isArray: false }, []);
        const result = sut.validate(type[1]);
        expect(result.isSuccess()).toBe(true);
      });

      test('fail, received nullable values', () => {
        const values = [undefined, null];
        const sut = new LiteralFieldValidator('fieldName', type[0], true, { isArray: false }, []);
        values.forEach((value) => {
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

      test('fail, received empty string', () => {
        const sut = new LiteralFieldValidator('fieldName', type[0], true, { isArray: false }, []);
        const result = sut.validate('');
        expect(result.isFailure()).toBe(true);
        expect(result.value).toEqual({
          fieldName: [
            {
              text: "Сротка обязательна к заполнению",
              hint: {}
            }
          ]
        });
      });
    });
  });

  types.forEach((type) => {
    describe('is not requered field validator tests', () => {
      test('success, received string', () => {
        const sut = new LiteralFieldValidator('fieldName', type[0], false, { isArray: false }, []);
        const result = sut.validate(type[1]);
        expect(result.isSuccess()).toBe(true);
      });

      test('fail, received nullable values', () => {
        const values = [undefined, null];
        const sut = new LiteralFieldValidator('fieldName', type[0], false, { isArray: false }, []);
        values.forEach((value) => {
          const result = sut.validate(value);
          expect(result.isSuccess()).toBe(true);
        });
      });

      test('fail, received empty string', () => {
        const sut = new LiteralFieldValidator('fieldName', 'number', false, { isArray: false }, []);
        const result = sut.validate('');
        expect(result.isFailure()).toBe(true);
        expect(result.value).toEqual({
          fieldName: [
            {
              text: "Значение должно быть числовым",
              hint: {}
            }
          ]
        });
      });
      

      test('fail, received empty string', () => {
        const sut = new LiteralFieldValidator('fieldName', 'string', false, { isArray: false }, []);
        const result = sut.validate('');
        expect(result.isSuccess()).toBe(true);
      });

      test('fail, received empty string', () => {
        const sut = new LiteralFieldValidator('fieldName', 'boolean', false, { isArray: false }, []);
        const result = sut.validate('');
        expect(result.isFailure()).toBe(true);
      });
    });
  });

  describe('is not requered dto field validator tests', () => {
    const sut = new DtoFieldValidator('email', 'dto', false, { isArray: false }, FieldValidatorPrivateFixtures.emailAttrsValidatorMap);
    test('success, received undefined', () => {
      const result = sut.validate(undefined);
      expect(result.isSuccess()).toBe(true);
    });

    test('success, received null', () => {
      const result = sut.validate(null);
      expect(result.isSuccess()).toBe(true);
    });

    test('success, received empty string', () => {
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        email: [
          {
            text: "Значение должно быть объектом",
            hint: {}
          }
        ]
      });
    });
  });
  
  test('fail, received empty string new', () => {
    const sut = new LiteralFieldValidator('fieldName', 'number', true, { isArray: false }, []);
    const result = sut.validate('');
    expect(result.isFailure()).toBe(true);
    expect(result.value).toEqual({
      fieldName: [
        {
          text: "Значение должно быть числовым",
          hint: {}
        }
      ]
    });
  });
});