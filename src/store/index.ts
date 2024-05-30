import { create } from "zustand";
// api/interface
import { IFetchNFT } from "@/api/interface";
// utils
import { screens } from "@/utils/data";
import { IItem } from "@/utils/menu";

interface IMenuStore {
  state: IItem[];
  setSelectedState: (id: number) => void;
}

export const useMenuStore = create<IMenuStore>((set) => ({
  state: screens.menu.items,
  setSelectedState: (_id: number) =>
    set((store) => {
      const updatedState = store.state.map((item) => ({
        ...item,
        selected: item.id == _id,
      }));

      return { state: updatedState };
    }),
}));

interface IOwnerNFTPortfolio {
  [name: string]: IFetchNFT;
}

interface IOwnerNFTPortfolioStore {
  state: IOwnerNFTPortfolio;
  setState: (updatedState: IOwnerNFTPortfolio) => void;
}

export const useOwnerNFTPortfolioStore = create<IOwnerNFTPortfolioStore>(
  (set) => ({
    state: {},
    setState: (updatedState: IOwnerNFTPortfolio) =>
      set((_store) => ({ state: { ..._store.state, ...updatedState } })),
  })
);
