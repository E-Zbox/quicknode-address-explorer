import { Core } from "@quicknode/sdk";
// interface
import {
  IFetchNFTResponse,
  ITransactionsByAddressResponse,
  IWalletTokenBalanceResponse,
} from "./interface";

const core = new Core({
  endpointUrl: "https://docs-demo.quiknode.pro/",
  config: {
    addOns: {
      nftTokenV2: true,
    },
  },
});

export const ethereumWhales = [
  {
    text: "0x00000000219ab540356cbb839cbe05303d7705fa",
    selected: true,
  },
  {
    text: "0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2",
    selected: false,
  },
  {
    text: "0xbe0eb53f46cd790cd13851d5eff43d12404d33e8",
    selected: false,
  },
  {
    text: "0x8315177ab297ba92a06054ce80a67ed4dbd7ed3a",
    selected: false,
  },
];

export const fetchNFTs = async (
  wallet: string,
  page = 1
): Promise<IFetchNFTResponse> => {
  let response: IFetchNFTResponse = {
    data: {
      owner: "",
      assets: [],
      totalPages: 0,
      totalItems: 0,
      pageNumber: 0,
    },
    error: "",
    success: false,
  };

  try {
    const result = await core.client.qn_fetchNFTs({
      wallet: wallet,
      perPage: 20,
      page,
    });

    console.log(result);

    response = {
      data: {
        ...result,
        assets: result.assets.map((item) => ({ ...item, selected: false })),
      },
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getTransactionsByAddress = async (
  address: string,
  page: 1
): Promise<ITransactionsByAddressResponse> => {
  let response: ITransactionsByAddressResponse = {
    data: {
      pageNumber: 0,
      paginatedItems: [],
      totalItems: 0,
      totalPages: 0,
    },
    error: "",
    success: false,
  };

  try {
    const data = await core.client.qn_getTransactionsByAddress({
      address,
      perPage: 20,
      page,
    });

    response = {
      data,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};

export const getWalletTokenBalance = async (
  wallet: string,
  page = 1
): Promise<IWalletTokenBalanceResponse> => {
  let response: IWalletTokenBalanceResponse = {
    data: {
      result: [],
      totalItems: 0,
      totalPages: 0,
      pageNumber: 0,
    },
    error: "",
    success: false,
  };

  try {
    const result = await core.client.qn_getWalletTokenBalance({
      wallet,
      perPage: 20,
      page,
    });

    response = {
      data: result,
      error: "",
      success: true,
    };
  } catch (error) {
    response = {
      ...response,
      error: `${error}`,
    };
  } finally {
    return response;
  }
};
