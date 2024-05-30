// assets
import gridViewIcon from "../../public/icons8-grid-view-96.png";
import leftButton from "../../public/icons8-less-than-30.png";
import listViewIcon from "../../public/icons8-list-view-96.png";
import rightButton from "../../public/icons8-greater-than-30.png";
import unknownCoin from "../../public/icons8-unknown-coin-64.png";

const tabs = [
  {
    selected: true,
    title: "Transaction (TX)",
  },
  {
    selected: false,
    title: "Hodlings Position",
  },
];

export default {
  tabs,
  hodlingScreen: {
    images: {
      gridViewIcon,
      listViewIcon,
      unknownCoin,
    },
  },
  txScreen: {
    images: {
      leftButton,
      rightButton,
    },
  },
};
