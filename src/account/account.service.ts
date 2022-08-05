import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { Alchemy, Network } from 'alchemy-sdk';
import { Account } from './account.entity';
import { GetAccountInput } from './dto/get_account.input';

@Injectable()
export class AccountService {
  private provider: Alchemy;

  private setProvider(network: string) {
    switch (network) {
      case 'Ethereum':
        this.provider = new Alchemy({
          apiKey: process.env.ETH_MAINNET_API_KEY,
          network: Network.ETH_MAINNET,
        });
        break;
      case 'Goerli':
        this.provider = new Alchemy({
          apiKey: process.env.ETH_GOERLI_API_KEY,
          network: Network.ETH_GOERLI,
        });
        break;
      case 'Polygon':
        this.provider = new Alchemy({
          apiKey:  process.env.POLYGON_API_KEY,
          network: Network.MATIC_MAINNET,
        });
        break;
      case 'Mumbai':
        this.provider = new Alchemy({
          apiKey:  process.env.MUMBAI_API_KEY,
          network: Network.MATIC_MUMBAI,
        });
        break;
      default:
        this.provider = new Alchemy({
          apiKey:  process.env.ETH_MAINNET_API_KEY,
          network: Network.ETH_MAINNET,
        });
    }
  }

  async getAccount(data: GetAccountInput): Promise<Account> {
    this.setProvider(data.network);

    const nfts = await this.provider.nft.getNftsForOwner(data.id);
    if (!nfts) {
      throw new InternalServerErrorException('Get Account Tokens failed');
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

    return {
      id: data.id,
      network: data.network,
      tokens: tokens,
      numberOfTokens: nfts.totalCount,
    };
  }
}
