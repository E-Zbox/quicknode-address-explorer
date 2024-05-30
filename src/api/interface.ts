interface IGeneric<T> {
  data: T;
  error: string;
  success: boolean;
}

export interface IFetchNFT {
  owner: string;
  assets: {
    collectionName: string;
    collectionTokenId: string;
    collectionAddress: string;
    name: string;
    description: string;
    imageUrl: string;
    traits: { trait_type: string; value: string }[];
    chain: string;
    network: string;
    selected: boolean;
  }[];
  totalPages?: number;
  totalItems?: number;
  pageNumber?: number;
}

export interface IFetchNFTResponse extends IGeneric<IFetchNFT> {}

export interface IWalletTokenBalanceResult {
  quantityIn: string;
  quantityOut: string;
  name: string | null;
  symbol: string | null;
  decimals: string | null;
  address: string;
  totalBalance: string;
}

export interface IWalletTokenBalance {
  result: IWalletTokenBalanceResult[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
}

export interface IWalletTokenBalanceResponse
  extends IGeneric<IWalletTokenBalance> {}

export interface ITransactionsByAddressResult {
  blockTimestamp: string;
  transactionHash: string;
  blockNumber: string;
  transactionIndex: number;
  fromAddress: string;
  toAddress: string;
  contractAddress: string | null;
  value: string;
}

export interface ITransactionsByAddress {
  paginatedItems: ITransactionsByAddressResult[];
  totalItems: number;
  totalPages: number;
  pageNumber: number;
}

export interface ITransactionsByAddressResponse
  extends IGeneric<ITransactionsByAddress> {}
