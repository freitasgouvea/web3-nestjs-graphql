import { Field, InputType } from "@nestjs/graphql";
import { IsString, IsNotEmpty } from "class-validator";

@InputType()
export class GetAccountInput {
  @Field({nullable: false})
  @IsString()
  @IsNotEmpty({message: 'empty account address'})
  address: string;

  @Field({nullable: false})
  @IsString()
  @IsNotEmpty({message: 'empty network'})
  network: string;

  @Field({nullable: true})
  @IsString()
  tokenType: string;

  @Field({nullable: true})
  @IsString()
  pageKey: string;
}