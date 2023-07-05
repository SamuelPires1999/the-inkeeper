import { HSClient } from "@/lib/hearthstone-api/clients";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cardResults = await HSClient.get(
    `/cards?pageSize=6&textFilter=${req.query.filter}&locale=en_US`,
    {
      headers: {
        Authorization: `Bearer ${req.cookies.accessToken}`,
      },
    }
  );

  const sanitizedCardList = cardResults.data.cards.map((card: any) => {
    return {
      id: card.id,
      name: card.name,
      flavorText: card.flavorText,
      image: card.image,
      text: card.text,
      rarityId: card.rarityId,
      manaCost: card.manaCost,
      slug: card.slug,
      classId: card.classId,
      setId: card.cardSetId,
      attack: card.attack,
      health: card.health,
      typeId: card.cardTypeId,
    };
  });
  return res.json(sanitizedCardList);
}
