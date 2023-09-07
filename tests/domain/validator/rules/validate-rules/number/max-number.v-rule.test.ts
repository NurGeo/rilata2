import { MaxNumberValidationRule } from "../../../../../../src/domain/validator/rules/validate-rules/number/max-number.v-rule";

describe('Number must be less than or equal to', () => {
    const maxAllowedNumber = 32;

    test('success, the resulting value is less than or equal to the maximum number', () => {
        const sut = new MaxNumberValidationRule(maxAllowedNumber);

        for (let i = 1; i <= maxAllowedNumber; i+=1) {
            const result = sut.validate(i);
            expect(i).toBeLessThanOrEqual(maxAllowedNumber);
            expect( result ).toEqual({ behaviour: 'RunNextRule' });
        }
    });
    
    test('failure, received value is not a number', () => {
        const sut = new MaxNumberValidationRule(maxAllowedNumber);
        const diffTypes = ['abcde', null, {}, [], true, false];
        
        diffTypes.forEach((invalidValue) => {
            expect(() => {
                if (typeof invalidValue !== 'number') throw new Error('SaveErrorAndRunNextRule');
                sut.validate(invalidValue);
            }).toThrow('SaveErrorAndRunNextRule');
        });
    });
});
