import { IsArrayTypeRule } from "../../../src/domain/validator/rules/type-rules/is-array-type.t-rule";
import { SaveErrorAndBreakValidation } from "../../../src/domain/validator/rules/types";

describe(' shakal', () => {
    test('fail, value is string', () =>{
        const arrType = new IsArrayTypeRule();
        const expectedValue = {
            behaviour: 'SaveErrorAndBreakValidation',
            ruleError: { text: 'Значение должно быть массивом данных', hint: {} }
        }
        const result = arrType.validate("шакал");
        expect(result).toEqual(expectedValue);
    });
    test('success, value is array', () => {
        const arrType = new IsArrayTypeRule();
        const expectedValue = {
            behaviour: 'SaveErrorAndBreakValidation',
            ruleError: { text: 'Значение должно быть массивом данных', hint: {} }
        }
        const result = arrType.validate(['dasd']);
        expect(result).toEqual(expectedValue);
    });
})
