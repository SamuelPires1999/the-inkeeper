import axios from "axios";
export const HSClient = axios.create({
  baseURL: "https://us.api.blizzard.com/hearthstone",
});
