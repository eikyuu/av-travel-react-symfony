import axios from "axios";
import { BOOKINGS_API } from "../config";

function create(booking) {
  return axios.post(BOOKINGS_API, booking);
}

export default {
  create,
};
