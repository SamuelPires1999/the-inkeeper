export type Card = {
  id: number;
  rarityId: number;
  slug: string;
  health?: number;
  attack?: number;
  manaCost: number;
  image: string;
  flavorText: string;
};
