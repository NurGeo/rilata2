import { MinNumberValidationRule } from "../../../../../../src/domain/validator/rules/validate-rules/number/min-number.v-rule";

describe('Number must be greater than or equal to', () => {
    function getRandomNumber(num: number): number {
        if (num < 0.49) return Math.floor(num * 65)
        else return Math.floor(num * (-32))
    }
    
    let randomNumber = Number(Math.random().toFixed(1));
    let minAllowedNumber = getRandomNumber(randomNumber) !== 0
                            ? getRandomNumber(randomNumber) 
                            : 1;

    test('success, the resulting value is greater than or equal to the minimum number', () => {
        const sut = new MinNumberValidationRule(minAllowedNumber);
        console.log(`Before for ${minAllowedNumber}`);
        for (let i = minAllowedNumber+2; i >= minAllowedNumber; i-=1) {
            const result = sut.validate(i);
            console.log(i);
            expect(i).toBeGreaterThanOrEqual(minAllowedNumber);
            expect( result ).toEqual({ behaviour: 'RunNextRule' });
        }
    });
    
    test('failure, initialization with a number less than the minimum number', () => {
        const sut = new MinNumberValidationRule(21);
        const result = sut.validate(20);

            expect(result).not.toBe({
                requirement: 'SaveErrorAndBreakValsidation',
                ruleHint: {
                    "hint": { 
                        "min": result, 
                    },
                "text": "Число должно быть больше или равно {{min}}",
            }
        });
    });
});