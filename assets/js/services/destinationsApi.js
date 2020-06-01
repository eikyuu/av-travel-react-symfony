import axios from "axios";
import { DESTINATIONS_API } from "../config";

function findAll() {
  return axios
    .get(DESTINATIONS_API)
    .then((response) => response.data["hydra:member"]);
}

function deleteDestination(id) {
  return axios.delete(DESTINATIONS_API + "/" + id);
}

export default {
  findAll,
  delete: deleteDestination,
};
