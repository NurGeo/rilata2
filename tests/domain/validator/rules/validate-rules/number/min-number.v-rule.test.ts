import { MinNumberValidationRule } from "../../../../../../src/domain/validator/rules/validate-rules/number/min-number.v-rule";

describe('Number must be greater than or equal to', () => {
    const minAllowedNumber = 10;
    const maxAllowedNumber = 32;
    test('success, the resulting value is greater than or equal to the minimum number', () => {
        const sut = new MinNumberValidationRule(minAllowedNumber);

        for(let i = maxAllowedNumber; i >= minAllowedNumber; i -= 1){
            const result = sut.validate(i);
            expect(i).toBeGreaterThanOrEqual(minAllowedNumber);
            expect(result).toEqual({ behaviour: 'RunNextRule' });
            console.log(i);
        }
    });
    
    test('failure, received value is not a number', () => {
        const sut = new MinNumberValidationRule(minAllowedNumber);
        const diffTypes = ['abcde', null, {}, [], true, false];
        
        diffTypes.forEach((invalidValue) => {
            expect(() => {
                if (typeof invalidValue !== 'number') throw new Error('SaveErrorAndRunNextRule');
                sut.validate(invalidValue);
            }).toThrow('SaveErrorAndRunNextRule');
        });
    });
});
