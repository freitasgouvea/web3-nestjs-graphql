import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class GetAccountInput {
  @Field()
  @IsString()
  @IsNotEmpty({message: 'empty account address'})
  address: string;

  @Field()
  @IsString()
  @IsNotEmpty({message: 'empty network'})
  network: string;

  @Field()
  @IsString()
  tokenType: string;
}