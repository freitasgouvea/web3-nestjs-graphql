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

  async getAccount(args: GetAccountInput): Promise<Account> {
    try {
      this.provider = this.providerService.setProvider(args.network);
      
      const nfts = await this.provider.nft.getNftsForOwner(args.address, {
        pageKey: args.pageKey || null,
      });
      if (!nfts) {
        this.logger.error(`Get ${args.address} tokens failed`);
      }

      let filteredNfts: any;
      if (args.tokenType) {
        filteredNfts = nfts.ownedNfts.filter(
          (element) => element.tokenType == args.tokenType,
        );
      } else {
        filteredNfts = nfts.ownedNfts;
      }

      const tokens = [];
      for (const item of filteredNfts) {
        tokens.push({
          contract: item.contract.address,
          tokenId: item.tokenId,
          tokenType: item.tokenType,
          balance: item.balance,
        });
      }

      return {
        address: args.address,
        network: this.provider.config.network,
        tokens: tokens,
        numberOfTokens: nfts.totalCount,
        pageKey: nfts.pageKey || null
      };
    } catch (error) {
      this.logger.error(`Get account tokens error: ${error}`);
    }
  }
}
