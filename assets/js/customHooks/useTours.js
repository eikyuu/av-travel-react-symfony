import React, { useEffect, useState } from "react";
import toursApi from "../services/toursApi";

export default function useTours() {
  const [tours, setTours] = useState([]);

  const fetchTours = async () => {
    try {
      const data = await toursApi.findAll();
      setTours(data);
    } catch (error) {
      console.log("Impossible de charger les tours");
    }
  };

  useEffect(() => {
    fetchTours();
  }, []);
  return tours;
}
