import { describe, expect, test } from 'bun:test';
import { DtoFieldValidator } from '../../../../src/domain/validator/field-validator/dto-field-validator';
import { LiteralFieldValidator } from '../../../../src/domain/validator/field-validator/literal-field-validator';
import { GetFieldValidatorDataType } from '../../../../src/domain/validator/field-validator/types';
import { LiteralDataType } from '../../../../src/domain/validator/rules/types';
import { ContainedOnlyCharsValidationRule } from '../../../../src/domain/validator/rules/validate-rules/string/contained-only-chars';
import { FieldValidatorPrivateFixtures, FieldValidatorTestMocksPrivateFixtures } from './test-fixtures';

  describe('Тесты для параметра Required', () => {
  const types: [GetFieldValidatorDataType<LiteralDataType>, unknown][] = [
    ['number', 5],
    ['string', 't'],
    ['boolean', false]
  ];
  
  types.forEach((type) => {
    describe('Валидированная значение обязательна', () => {

      test('Успех, на валидацию пришло явное значение', () => {
        const sut = new LiteralFieldValidator('fieldName', true, { isArray: false },type[0], []);
        const result = sut.validate(type[1]);
        expect(result.isSuccess()).toBe(true);
      });

      test('Ошибка, пришло undefined или null', () => {
        const values = [undefined, null];
        const sut = new LiteralFieldValidator('fieldName', true, { isArray: false },type[0], []);
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
    });
  });

  describe('Валидированная значение обязательна', () => {
    test('Ошибка, пришло пустая строка', () => {
      const sut = new LiteralFieldValidator('fieldName',  true, { isArray: false },'number', []);
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        fieldName: [
          {
            hint: {},
            text: "Значение должно быть числовым"
          }
        ]
      });
    });
  
    test('Ошибка, пришло пустая строка', () => {
      const sut = new LiteralFieldValidator('fieldName',  true, { isArray: false },'string', []);
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        fieldName: [
          {
            hint: {},
            text: "Сротка обязательна к заполнению"
          }
        ]
      });
    });
    test('Ошибка, пришло пустая строка', () => {
      const sut = new LiteralFieldValidator('fieldName',  true, { isArray: false }, 'boolean',[]);
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        fieldName: [
          {
            hint: {},
            text: "Значение должно быть булевым"
          }
        ]
      });
  });
  });

  describe('Валидированная значение обязательна', () => {
    const sut = new DtoFieldValidator('email',  true, { isArray: false }, 'dto', FieldValidatorPrivateFixtures.emailAttrsValidatorMap);
    const values = [undefined, null];

    test('Успех, на валидацию пришло явное значение', () => {
      const result = sut.validate(
        { 
          value: "hetso@mail.ru",
          noOutField: "absolute"
        }
      );
      expect(result.isSuccess()).toBe(true);
    });
    
    test('Ошибка, пришло undefined или null', () => {
      values.forEach((value) => {
      const result = sut.validate(value);
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        ___whole_value_validation_error___:  [
          {
            text: "Значение не должно быть undefined или null",
            hint: {}
          }
        ]
      });
    });
  });

    test('Ошибка, пришло пустая строка', () => {
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        ___whole_value_validation_error___:  [
          {
            text: "Значение должно быть объектом",
            hint: {}
          }
        ]
      }); 
    });
  });


  types.forEach((type) => {
    describe('Валидированная значение необязательна', () => {
      test('Успех, на валидацию пришло явное значение', () => {
        const sut = new LiteralFieldValidator('fieldName',  false, { isArray: false }, type[0],[]);
        const result = sut.validate(type[1]);
        expect(result.isSuccess()).toBe(true);
      });

      test('Ошибка, пришло undefined или null', () => {
        const values = [undefined, null];
        const sut = new LiteralFieldValidator('fieldName', false, { isArray: false },type[0],[]);
        values.forEach((value) => {
          const result = sut.validate(value);
          expect(result.isSuccess()).toBe(true);
        });
      });
  });
  });

  describe('Валидированная значение необязательна', () => {
    test('Ошибка, пришло пустая строка', () => {
      const sut = new LiteralFieldValidator('fieldName',  false, { isArray: false }, 'number',[]);
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
    test('Ошибка, пришло пустая строка', () => {
      const sut = new LiteralFieldValidator('fieldName',  false, { isArray: false }, 'string',[]);
      const result = sut.validate('');
      expect(result.isSuccess()).toBe(true);
    });

    test('неудачно, пришло пустая строка', () => {
      const sut = new LiteralFieldValidator('fieldName',  false, { isArray: false },'boolean', []);
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        fieldName: [
          {
            text: "Значение должно быть булевым",
            hint: {}
          }
        ]
      });
    });
  });


  describe('Валидированная значение необязательна', () => {
    const sut = new DtoFieldValidator('email', false, { isArray: false },'dto',  FieldValidatorPrivateFixtures.emailAttrsValidatorMap);
    const values = [undefined, null];
    test('Ошибка, пришло undefined или null', () => {
      values.forEach((value) => {
      const result = sut.validate(value);
      expect(result.isSuccess()).toBe(true);
    });
  });

    test('Ошибка, пришло пустая строка', () => {
      const result = sut.validate('');
      expect(result.isFailure()).toBe(true);
      expect(result.value).toEqual({
        ___whole_value_validation_error___:  [
          {
            text: "Значение должно быть объектом",
            hint: {}
          }
        ]
      }); 
    });
  });
});
