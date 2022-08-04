import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class Account {
  @Field(type => ID)
  id: string;

  @Field()
  tokens: any;

  @Field()
  numTokens: any;
}