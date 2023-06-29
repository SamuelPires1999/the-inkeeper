import { getToken } from "@/lib/hearthstone-api/getToken";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await getToken();
  if (!data.token) {
    return res.status(401).json({
      error: "Could not retrieve OAuth access token",
    });
  }
  res.setHeader(
    "Set-Cookie",
    `accessToken=${data.token}; HttpOnly; Max-Age=${data.expires_in}; Path=/`
  );

  return res.json({
    token: data.token,
  });
}
