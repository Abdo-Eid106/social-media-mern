import { registerEnumType } from '@nestjs/graphql';

export enum orderBy {
  ASC = 'asc',
  DESC = 'desc',
}

registerEnumType(orderBy, {
  name: 'ordeyBy',
});
