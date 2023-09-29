import { ValidationRuleAnswer } from '../../types';
import { ValidationRule } from '../../validation-rule';

export class PositiveNumberValidationRule extends ValidationRule<'validate', number> {
  requirement = 'Число должно быть положительным {{number}}';

  constructor(private positiveNumber: number = 0) {
    super();
  }

  validate(value: number): ValidationRuleAnswer {
    return value >= this.positiveNumber
      ? this.returnSuccess('RunNextRule')
      : this.returnFail('SaveErrorAndRunNextRule', { number: this.positiveNumber });
  }
}
