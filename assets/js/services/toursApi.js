import axios from "axios";
import { TOURS_API } from "../config";

function findAll() {
  return axios.get(TOURS_API).then(response => response.data["hydra:member"]);
}

export default {
  findAll
};
