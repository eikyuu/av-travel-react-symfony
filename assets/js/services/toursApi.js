import axios from "axios";
import { TOURS_API } from "../config";

function findAll() {
  return axios.get(TOURS_API).then((response) => response.data["hydra:member"]);
}

function deleteTours(id) {
  return axios.delete(TOURS_API + "/" + id);
}

async function find(id) {
  return axios.get(TOURS_API + "/" + id).then((response) => response.data);
}

function update(id, tours) {
  return axios.put(TOURS_API + "/" + id, tours);
}

function create(tours) {
  return axios.post(TOURS_API, tours);
}

export default {
  findAll,
  delete: deleteTours,
  create,
  find,
  update,
};
