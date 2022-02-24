import avion from "avion";
import { url, apikey } from "../config";

export async function fetchStores() {
  debugger;
  let json = await avion({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "stores/list",
    params: {
      apikey,
    },
  });
  return json;
}
