import axios from "axios";
import { DESTINATIONS_API } from "../config";

function findAll() {
  return axios
    .get(DESTINATIONS_API)
    .then(response => response.data["hydra:member"]);
}

export default {
  findAll
};
