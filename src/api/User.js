import axios from "axios";
import qs from "qs";
import { url, apikey } from "../config";

export async function fetchUser(username) {
  let json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "users/users?apikey=" + apikey,
    params: {
      username,
    },
  });
  return json;
}

export async function fetchUsers() {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "users/users",
    params: {
      apikey,
    },
  });
  return json;
}

export async function userUpdate(user) {
  const json = await axios({
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    url: url + "users/update",
    data: qs.stringify({
      user,
      apikey,
    }),
  });
  return json;
}

export async function userDelete(id) {
  const json = await axios({
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    url: url + "users/delete",
    params: {
      id,
      apikey,
    },
  });
  return json;
}
