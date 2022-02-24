import avion, { stringify } from "avion";
import { url, apikey } from "../config";

export async function fetchStores() {
  debugger;
  let json = await avion({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "stores/list?apikey=" + apikey,
    params: {
      apikey,
    },
  });
  return json;
}

export async function addStore(
  storeNumber,
  storeName,
  termCount,
  version,
  state,
  taxRate,
  groupId
) {
  const json = await avion({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: url + "stores/create?apikey=" + apikey,
    data: stringify({
      storeNumber,
      storeName,
      termCount,
      version,
      state,
      taxRate,
      groupId,
    }),
  });
  return json;
}
