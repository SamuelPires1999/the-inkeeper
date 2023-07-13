import { Card } from "@/types/card";
import { create } from "zustand";

type deckStoreProps = {
  deckList: Card[];
  addCard: (card: Card) => void;
  removeCard: (cardName: Card) => void;
};

export const useDeckStore = create<deckStoreProps>((set) => ({
  deckList: [],
  addCard: (newCard: Card) =>
    set((state) => {
      state.deckList.push(newCard);
      return { deckList: state.deckList };
    }),
  removeCard: (targetCard: Card) => {
    set((state) => {
      console.log(state.deckList);
      const target = state.deckList.find(
        (item) => item.name === targetCard.name
      );

      if (!target) {
        return {
          deckList: state.deckList,
        };
      }
      console.log(state.deckList.indexOf(target));
      return {
        deckList: state.deckList.splice(state.deckList.indexOf(target), 1),
      };
    });
  },
}));
