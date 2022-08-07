import { Injectable, Logger } from '@nestjs/common';
import { Alchemy } from 'alchemy-sdk';
import { ProviderService } from 'src/provider/provider.service';
import { Account } from './account.entity';
import { GetAccountInput } from './dto/get_account.input';

@Injectable()
export class AccountService {
  constructor(private readonly providerService: ProviderService) {}

  private readonly logger = new Logger(Account.name);
  private provider: Alchemy;

  async getAccount(data: GetAccountInput): Promise<Account> {
    this.provider = this.providerService.setProvider(data.network);

    const nfts = await this.provider.nft.getNftsForOwner(data.address);
    if (!nfts) {
      this.logger.error(`Get ${data.address} tokens failed`);
    }

    const tokens = [];
    const filteredTokens = nfts.ownedNfts.filter(
      (element) => element.tokenType == data.tokenType,
    );
    for (const item of filteredTokens) {
      tokens.push({
        contract: item.contract.address,
        tokenId: item.tokenId,
        tokenType: item.tokenType,
        balance: item.balance,
      });
    }

    this.logger.log(`Get ${data.address} tokens with success`);

    return {
      address: data.address,
      network: data.network,
      tokens: tokens,
      numberOfTokens: nfts.totalCount,
    };
  }
}
