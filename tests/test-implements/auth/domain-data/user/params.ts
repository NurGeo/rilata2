import { UuidType } from '../../../../../src/common/types';
import { AggregateRootDataParams } from '../../../../../src/domain/domain-object-data/aggregate-data-types';
import { DomainMeta } from '../../../../../src/domain/domain-object-data/common-types';

export type UserAttrs = {
  id: UuidType,
  emplyeerId: UuidType,
  passHash: string,
}

export type UserMeta = DomainMeta<'UserAR'>;

export type UserParams = AggregateRootDataParams<
  UserAttrs, UserMeta, never
>;

export type OutputUserAttrs = Omit<UserAttrs, 'passHash'>;
