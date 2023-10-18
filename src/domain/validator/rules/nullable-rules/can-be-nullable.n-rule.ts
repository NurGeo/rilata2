import { ValidationRule } from '../validation-rule';
import { EmptyValueRuleAnswer } from '../types';

export class CanBeNullableRule extends ValidationRule<'nullable', unknown> {
  requirement = 'Значение может быть равным undefined или null';

  validate(value: unknown): EmptyValueRuleAnswer {
    return (value === undefined || value === null)
      ? this.returnSuccess('SuccessBreakValidation')
      : this.returnSuccess('SuccessRunNextRule');
  }
}
