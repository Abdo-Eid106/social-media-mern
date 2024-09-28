import { Field, Float, InputType } from '@nestjs/graphql';

@InputType()
export class StringFilter {
  @Field({ nullable: true })
  contains?: string;

  @Field({ nullable: true })
  startsWith?: string;

  @Field({ nullable: true })
  equals?: string;

  @Field(() => [String], { nullable: true })
  in?: string[];
}

@InputType()
export class NumberFilter {
  @Field(() => Float, { nullable: true })
  lt?: number;

  @Field(() => Float, { nullable: true })
  lte?: number;

  @Field(() => Float, { nullable: true })
  gt?: number;

  @Field(() => Float, { nullable: true })
  gte?: number;

  @Field(() => Float, { nullable: true })
  equals?: number;
}

@InputType()
export class DateFilter {
  @Field({ nullable: true })
  lt?: Date;

  @Field({ nullable: true })
  lte?: Date;

  @Field({ nullable: true })
  gt?: Date;

  @Field({ nullable: true })
  gte?: Date;

  @Field({ nullable: true })
  equals?: Date;
}
