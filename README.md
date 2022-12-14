## Description

NestJs and GraphQL API that allows getting all ntfs from types ERC721 or ERC1155 from any wallet in Ethereum, Goerli, Polygon and Mumbai netowrks. This API uses `alchemy-sdk` as library and Alchemy as network provider.

- [Nest](https://github.com/nestjs/nest)
- [GraphQL](https://graphql.org/learn/)
- [Alchemy](https://www.alchemy.com/)

## Installation

```bash
$ npm install
```

Before run the app set the Alchemy provider API keys at `.env` file

```
ETH_MAINNET_API_KEY=''
ETH_GOERLI_API_KEY=''
POLYGON_API_KEY=''
MUMBAI_API_KEY=''
```

## Running the app

You can start this app:

```bash
# development
$ npm run start

# watch mode
$ npm run start:dev

# production mode
$ npm run start:prod
```

## Using the app

You can query all ntfs from types `ERC721` or `ERC1155` from any account address in `Ethereum`, `Goerli`, `Polygon` and `Mumbai` netowrks

For example, to find all tokens from an account in `Polygon` network you can call:

```bash
{
  account(
    args:{
      address: "0xBEBF19f001e5cC947D2a29bd9772973A94171fB3",
      network: "Polygon"
    }
  ) {
    address
    network
    tokens {
      contract
      tokenId
      tokenType
      balance
    }
    numberOfTokens
    pageKey
  }
}

```

Returns this data:

```bash
{
  "data": {
    "account": {
      "address": "0xBEBF19f001e5cC947D2a29bd9772973A94171fB3",
      "network": "polygon-mainnet",
      "tokens": [
        {
          "contract": "0x2135a021969c602b6363328a0bd4784b2055b6c0",
          "tokenId": "774",
          "tokenType": "ERC1155",
          "balance": 1
        },
        {
          "contract": "0x2953399124f0cbb46d2cbacd8a89cf0599974963",
          "tokenId": "46618549891136803090896323219167151000268539225479513296690729847191848888080",
          "tokenType": "ERC1155",
          "balance": 1
        },
        {
          "contract": "0x43c10aaba026d2cfcd95e639ad0700ea52907ea9",
          "tokenId": "1",
          "tokenType": "ERC1155",
          "balance": 1
        },
        {
          "contract": "0x9a3f1b22154f7ae4b0b248b105c2f3c3e27f477a",
          "tokenId": "8650",
          "tokenType": "ERC721",
          "balance": 1
        },
        {
          "contract": "0xf5f941cccf571a8bddd4420af269427394aed8fe",
          "tokenId": "580661",
          "tokenType": "ERC721",
          "balance": 1
        }
      ],
      "numberOfTokens": 5,
      "pageKey": null
    }
  }
}

```
You can also can do it using curl:

```
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"{\n  account(\n    args:{\n      address: \"0xBEBF19f001e5cC947D2a29bd9772973A94171fB3\",\n      network: \"Polygon\"\n    }\n  ) {\n    address\n    network\n    tokens {\n      contract\n      tokenId\n      tokenType\n      balance\n    }\n    numberOfTokens\n    pageKey\n  }\n}"}' --compressed

```

### Filter by token type

To filter the `ERC1155` tokens type in `Polygon` network from an account, for example, you need to pass `ERC1155` tokenType as account arguments:

```bash
{
  account(
    args:{
      address: "0xBEBF19f001e5cC947D2a29bd9772973A94171fB3",
      network: "Polygon",
      tokenType: "ERC1155"
    }
  ) {
    address
    network
    tokens {
      contract
      tokenId
      tokenType
      balance
    }
    numberOfTokens
    pageKey
  }
}

```

This query returns only the `ERC1155` tokens from an account:

```bash
{
  "data": {
    "account": {
      "address": "0xBEBF19f001e5cC947D2a29bd9772973A94171fB3",
      "network": "polygon-mainnet",
      "tokens": [
        {
          "contract": "0x2135a021969c602b6363328a0bd4784b2055b6c0",
          "tokenId": "774",
          "tokenType": "ERC1155",
          "balance": 1
        },
        {
          "contract": "0x2953399124f0cbb46d2cbacd8a89cf0599974963",
          "tokenId": "46618549891136803090896323219167151000268539225479513296690729847191848888080",
          "tokenType": "ERC1155",
          "balance": 1
        },
        {
          "contract": "0x43c10aaba026d2cfcd95e639ad0700ea52907ea9",
          "tokenId": "1",
          "tokenType": "ERC1155",
          "balance": 1
        }
      ],
      "numberOfTokens": 5,
      "pageKey": null
    }
  }
}

```
You can also can do it using curl:

```
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' --data-binary '{"query":"{\n  account(\n    args:{\n      address: \"0xBEBF19f001e5cC947D2a29bd9772973A94171fB3\",\n      network: \"Polygon\",\n      tokenType: \"ERC1155\"\n    }\n  ) {\n    address\n    network\n    tokens {\n      contract\n      tokenId\n      tokenType\n      balance\n    }\n    numberOfTokens\n    pageKey\n  }\n}"}' --compressed

```

### Pagination

If an account owns more than 100 tokens, the return will be accompanied by the `pageKey` id:

```
{
  "data": {
    "account": {
      "address": "0xBEBF19f001e5cC947D2a29bd9772973A94171fB3",
      "network": "eth-mainnet",
      "tokens": [
        ...
      ],
      "numberOfTokens": 984,
      "pageKey": "41dff091-d1de-432d-9f2b-bc5b255a441b"
    }
  }
}
```

And you can query again the next 100 tokens using `pageKey` id in account arguments:

```
{
  account(
    args: {
      address: "0xBEBF19f001e5cC947D2a29bd9772973A94171fB3"
      network: "Ethereum"
      pageKey: "41dff091-d1de-432d-9f2b-bc5b255a441b"
    }
  ) {
    address
    network
    tokens {
      contract
      tokenId
      tokenType
      balance
    }
    numberOfTokens
    pageKey
  }
```

