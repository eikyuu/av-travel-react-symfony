import axios from "axios";
import { DESTINATIONS_API } from "../config";

function findAll() {
  return axios
    .get(DESTINATIONS_API)
    .then((response) => response.data["hydra:member"]);
}

async function find(id) {
  return axios
    .get(DESTINATIONS_API + "/" + id)
    .then((response) => response.data);
}

function deleteDestination(id) {
  return axios.delete(DESTINATIONS_API + "/" + id);
}

function update(id, destination) {
  return axios.put(DESTINATIONS_API + "/" + id, destination);
}

function updateRelation(id, destination) {
  return axios.put(DESTINATIONS_API + "/" + id, {
    ...destination,
    destination: `/api/destinations/${destination.tour}`,
  });
}

function create(destination) {
  return axios.post(DESTINATIONS_API, destination);
}

export default {
  findAll,
  delete: deleteDestination,
  create,
  find,
  update,
  updateRelation,
};
