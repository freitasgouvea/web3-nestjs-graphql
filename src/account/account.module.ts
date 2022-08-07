import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { AccountResolver } from './account.resolver';
import { ProviderModule } from 'src/provider/provider.module';

@Module({
  imports: [ProviderModule],
  providers: [AccountService, AccountResolver]
})
export class AccountModule {}
