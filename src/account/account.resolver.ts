import { Logger } from '@nestjs/common';
import { Args, Query, Resolver } from '@nestjs/graphql';
import { Account } from './account.entity';
import { AccountService } from './account.service';
import { GetAccountInput } from './dto/get_account.input';

@Resolver('Account')
export class AccountResolver {
  constructor(
    private accountService: AccountService,
  ) {}

  private readonly logger = new Logger(Account.name);

  @Query(() => Account)
  async account(
    @Args('args') args: GetAccountInput,
  ): Promise<Account> {
    const account = await this.accountService.getAccount(args);
    this.logger.log(`Get ${account.address} tokens from ${account.network} with success`);
    return account;
  }
}
