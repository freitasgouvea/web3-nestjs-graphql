import { Args, Query, Resolver } from '@nestjs/graphql';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { GetAccountInput } from './dto/get_account.input';

@Resolver('Account')
export class AccountResolver {
  constructor(
    private accountService: AccountService,
  ) {}

  @Query(() => Account)
  async account(
    @Args('data') data: GetAccountInput
  ): Promise<Account> {
    const account = await this.accountService.getAccount(data);
    return account;
  }
}
