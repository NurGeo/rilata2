import { ValidationRuleAnswer } from '../../types';
import { ValidationRule } from '../../validation-rule';

export class MaxCharsCountValidationRule extends ValidationRule<'validate', string> {
  requirement = 'Длина строки должна быть меньше или равно {{maxCount}}';

  constructor(private maxCharsCount: number) {
    super();
  }

  validate(value: string): ValidationRuleAnswer {
    return value.length > this.maxCharsCount
      ? this.returnFail('SaveErrorAndRunNextRule', { maxCount: this.maxCharsCount })
      : this.returnSuccess('SuccessRunNextRule');
  }
}
