import axios from "axios";
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
