import axios from "axios";
import { BOOKINGS_API } from "../config";

function create(booking) {
  return axios.post(BOOKINGS_API, booking);
}

function deleteBooking(id) {
  return axios.delete(BOOKINGS_API + "/" + id);
}

export default {
  create,
  delete: deleteBooking,
};
