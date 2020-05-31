import React, { useEffect, useState } from "react";
import destinationsApi from "../services/destinationsApi";

export default function useDestinations() {
  const [destinations, setDestinations] = useState([]);

  const fetchDestinations = async () => {
    try {
      const data = await destinationsApi.findAll();
      setDestinations(data);
    } catch (error) {
      console.log("Impossible de charger les destinations");
    }
  };

  useEffect(() => {
    fetchDestinations();
  }, []);
  return destinations;
}
