// assets
import logo from "../../public/logo.png";
import quicknodeCoreApi from "../../public/quicknode-core-api.webp";
import quicknodeNFTApi from "../../public/quicknode-nft-api.webp";
import quicknodeTokenApi from "../../public/quicknode-token-api.webp";

const BODY_NORMAL = "NORMAL";

const BODY_BOLD = "BOLD";

const contents = [
  {
    body: [
      {
        type: BODY_NORMAL,
        text: "This website is your personal blockchain detective, letting you uncover the digital footprint of any wallet address.  Explore their NFT collection, delve into their crypto holdings, and trace their transaction history – all in one place.",
      },
    ],
    href: "",
    image: logo.src,
    // selected: true,
    title: "Quicknode Address Explorer",
  },
  {
    body: [
      {
        type: BODY_NORMAL,
        text: "Unleash the power of the blockchain. ",
      },
      {
        type: BODY_BOLD,
        text: " Quicknode Core API ",
      },
      {
        type: BODY_NORMAL,
        text: "grants fast, secure access to major blockchain networks, letting you interact and build decentralized applications without managing your own nodes.",
      },
    ],
    href: "https://www.quicknode.com/docs/ethereum",
    image: quicknodeCoreApi.src,
    // selected: false,
    title: "Core API",
  },
  {
    body: [
      {
        text: "Hunting for NFT data is a chore? Not anymore! ",
        type: BODY_NORMAL,
      },
      {
        text: "Quicknode NFT API ",
        type: BODY_BOLD,
      },
      {
        text: "streamlines the process, delivering NFT metadata across Ethereum and Solana blockchains instantly, saving you time and development effort.",
        type: BODY_NORMAL,
      },
    ],
    href: "https://www.quicknode.com/docs/ethereum/qn_fetchNFTCollectionDetails_v2",
    image: quicknodeNFTApi.src,
    // selected: false,
    title: "NFT API",
  },
  {
    body: [
      {
        text: "Tame the complexities of token data. ",
        type: BODY_NORMAL,
      },
      {
        text: "Quicknode's Token API ",
        type: BODY_BOLD,
      },
      {
        text: "puts a wealth of information at your fingertips, including wallet balances, token transfers, and historical data - all readily accessible without the need for manual indexing.",
        type: BODY_NORMAL,
      },
    ],
    href: "https://www.quicknode.com/docs/ethereum/qn_getTokenMetadataByContractAddress_v2",
    image: quicknodeTokenApi.src,
    // selected: false,
    title: "Token API",
  },
];

export default {
  contents,
  BODY_NORMAL,
  BODY_BOLD,
};
