import axios from "axios";
import { USERS_API } from "../config";

function register(user) {
  return axios.post(USERS_API, user);
}

async function find(id) {
  return axios.get(USERS_API + "/" + id).then((response) => response.data);
}

function update(id, user) {
  return axios.put(USERS_API + "/" + id, user);
}

export default {
  register,
  find,
  update,
};
