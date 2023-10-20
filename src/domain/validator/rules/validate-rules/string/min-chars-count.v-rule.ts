import { ValidationRuleAnswer } from '../../types';
import { ValidationRule } from '../../validation-rule';

export class MinCharsCountValidationRule extends ValidationRule<'validate', string> {
  requirement = 'Длина строки должна быть больше или равно {{minCount}}';

  constructor(private minCharsCount: number) {
    super();
  }

  validate(value: string): ValidationRuleAnswer {
    return value.length < this.minCharsCount
      ? this.returnFail('SaveErrorAndRunNextRule', { minCount: this.minCharsCount })
      : this.returnSuccess('SuccessRunNextRule');
  }
}
