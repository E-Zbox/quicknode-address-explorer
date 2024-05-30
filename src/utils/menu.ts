// assets
import homeIcon from "../../public/icons8-home-52.png";
import nftTrackerIcon from "../../public/icons8-rfid-signal-80.png";
import txHistoryIcon from "../../public/icons8-empty-hourglass-96.png";

export interface IItem {
  id: number;
  icon: string;
  selected: boolean;
  title: string;
}

export const ITEM_ONE = 1;
export const ITEM_TWO = 2;
export const ITEM_THREE = 3;

const items: IItem[] = [
  {
    id: ITEM_ONE,
    icon: homeIcon.src,
    selected: true,
    title: "Home",
  },
  {
    id: ITEM_TWO,
    icon: nftTrackerIcon.src,
    selected: false,
    title: "NFT Tracker",
  },
  {
    id: ITEM_THREE,
    icon: txHistoryIcon.src,
    selected: false,
    title: "TX & Hodlings",
  },
];

export default {
  items,
};
