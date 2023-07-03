import { HSClient } from "@/lib/hearthstone-api/clients";
import { Card } from "@/types/card";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    const response = await HSClient.get(
      `/cards/${req.query.slug}?locale=en_US`,
      {
        headers: {
          Authorization: `Bearer ${req.cookies.accessToken}`,
        },
      }
    );

    return res.json(response.data);
  } catch (error) {
    console.log(error);
  }
}
