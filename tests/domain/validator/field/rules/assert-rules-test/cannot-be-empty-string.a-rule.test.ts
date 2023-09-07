import { CannotBeEmptyStringValidationRule } from "../../../../../../src/domain/validator/rules/assert-rules/cannot-be-empty-string.a-rule";
// requirement = 'Значение должно быть не пустой строкой';
describe('can not empty string rule tests', () => {
    test('success, received value equal string', () => {
      const sut = new CannotBeEmptyStringValidationRule();
      const result = sut.validate('s');
      expect(result).toEqual({
        behaviour: 'RunNextRule',
      });
    });

    test('fail, received value equal empty  string', () => {
        const sut = new CannotBeEmptyStringValidationRule();
        const result = sut.validate('');
        expect(result).toEqual({
          behaviour: 'SaveErrorAndBreakValidation',
          ruleError: {
            "hint": {},
            "text": "Значение должно быть не пустой строкой",
          }
        });
      });

});