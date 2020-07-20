import axios from "axios";
import { USERS_API } from "../config";

function register(user) {
  return axios.post(USERS_API, user);
}

async function find(id) {
  return axios.get(USERS_API + "/" + id).then((response) => response.data);
}

export default {
  register,
  find,
};
