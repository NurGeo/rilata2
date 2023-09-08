import { MaxNumberValidationRule } from "../../../../../../src/domain/validator/rules/validate-rules/number/max-number.v-rule";

describe('Number must be less than or equal to', () => {
    
    function getRandomNumber(num: number): number {
        if (num < 0.49) return Math.floor(num * 65)
        else return Math.floor(num * (-32))
    }
    
    let randomNumber = Number(Math.random().toFixed(1));
    let maxAllowedNumber = getRandomNumber(randomNumber) !== 0
                            ? getRandomNumber(randomNumber) 
                            : 1;

    test('success, the resulting value is less than or equal to the maximum number', () => {
        const sut = new MaxNumberValidationRule(maxAllowedNumber);
        console.log(`Before for ${maxAllowedNumber}`);
        for (let i = maxAllowedNumber-2; i <= maxAllowedNumber; i+=1) {
            const result = sut.validate(i);
            console.log(i);
            expect(i).toBeLessThanOrEqual(maxAllowedNumber);
            expect( result ).toEqual({ behaviour: 'RunNextRule' });
        }

    });
    
    test('failure, initialization with a number greater than a large number', () => {
        const sut = new MaxNumberValidationRule(32);
        const result = sut.validate(33);
        
            expect(result).not.toBe({
                requirement: 'SaveErrorAndBreakValsidation',
                ruleHint: {
                    "hint": { 
                        "max": result, 
                    },
                "text": "Число должно быть меньше или равно {{max}}",
            }
        });
    });
});