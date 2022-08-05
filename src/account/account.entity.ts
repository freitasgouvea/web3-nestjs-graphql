import { Field, ID, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Account{
  @Field(() => ID)
  address:string;

  @Field()
  network: string;

  @Field(type => [Token])
  tokens: Token[];

  @Field()
  numberOfTokens: number;
}

@ObjectType()
export class Token{
  @Field()
  contract: string;

  @Field()
  tokenId: string;

  @Field()
  tokenType: string;

  @Field()
  balance: number;
}