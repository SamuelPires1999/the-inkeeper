export type Card = {
  id: number;
  name: string;
  flavorText: string;
  image: string;
  text: string;
  rarityId: number;
  manaCost: number;
  slug: string;
  classId: number;
  setId: number;
  attack?: number;
  health?: number;
  typeId: number;
  cropImage: string;
};
