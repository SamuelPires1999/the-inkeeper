import axios, { AxiosResponse } from "axios";

export async function getToken(): Promise<{
  token: string;
  expires_in: number;
}> {
  return new Promise((resolve, reject) => {
    axios
      .post(
        "https://us.battle.net/oauth/token",
        new URLSearchParams({
          grant_type: "client_credentials",
          client_id: process.env.BLIZZARD_CLIENT_ID as string,
          client_secret: process.env.BLIZZARD_CLIENT_SECRET as string,
        })
      )
      .then((response: AxiosResponse<any>) => {
        const { access_token, expires_in } = response.data;
        resolve({
          expires_in: expires_in,
          token: access_token,
        });
      })
      .catch((requestError) => {
        console.error("Error fetching access token:", requestError);

        reject(requestError);
      });
  });
}
