import { Args, ID, Query, Resolver } from "@nestjs/graphql";
import { AccountService } from "./account.service";
import { Account } from "./models/account.model";

@Resolver(of => Account)
export class AccountResolver {
  constructor(
    private accountService: AccountService,
  ) {}

  @Query(returns => Account)
  async author(@Args('id', { type: () => ID }) id: string) {
    return this.accountService.findAccount(id);
  }

}