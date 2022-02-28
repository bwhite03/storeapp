import qs from "qs";
import axios from "axios";
import { url, apikey } from "../config";

export async function fetchStores() {
  let json = await axios({
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
  const json = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: url + "stores/create?apikey=" + apikey,
    data: qs.stringify({
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

export async function storeDelete(id) {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "stores/delete",
    params: {
      id,
      apikey,
    },
  });
  return json;
}

export async function storeUpdate(store) {
  const json = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: url + "stores/update",
    data: qs.stringify({
      store,
      apikey,
    }),
  });
  return json;
}

export async function fetchStates() {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "stores/states",
    params: {
      apikey,
    },
  });
  return json;
}
