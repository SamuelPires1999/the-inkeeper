import { HSClient } from "@/lib/hearthstone-api/clients";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const cardResults = await HSClient.get("/cards?pageSize=10", {
    headers: {
      Authorization: `Bearer ${req.cookies.accessToken}`,
    },
  });
  return res.json(cardResults.data);
}
