import { Injectable } from '@nestjs/common';
import { Alchemy, Network } from 'alchemy-sdk';

@Injectable()
export class ProviderService {
  private provider: Alchemy;

  setProvider(network: string) {
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
    return this.provider
  }
}
