import { ValidationRule } from '../validation-rule';
import { TypeOrAssertRuleAnswer } from '../types';

export class CannotBeEmptyArrayAssertionRule extends ValidationRule<'assert', unknown> {
  requirement = 'Пожалуйста, укажите информацию во всех необходимых полях';

  validate(value: unknown): TypeOrAssertRuleAnswer {
    return Array.isArray(value) && value.length > 0
      ? this.returnSuccess('SuccessRunNextRule')
      : this.returnFail('SaveErrorAndBreakValidation');
  }
}
