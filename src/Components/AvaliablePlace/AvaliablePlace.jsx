import { useEffect, useState, memo } from "react";
import Place from "../Place";
import Error from "../Error/Error";
import { sortOlacesByDistance } from "../../loc";

const AvaliablePlace = memo(({ handleSeclectPlace }) => {
  const [avaliablePlace, setAvaliablePlace] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchPlaces() {
      setIsLoading(true);
      try {
        const response = await fetch("http://localhost:3000/places");
        const responseData = await response.json();
        if (!response.ok) {
          throw new Error("Something went wrong");
        }

        navigator.geolocation.getCurrentPosition((position) => {
          const sortedPlace = sortOlacesByDistance(
            responseData.places,
            position.coords.latitude,
            position.coords.longitude
          );

          setAvaliablePlace(sortedPlace);
          setIsLoading(false);
        });
      } catch (e) {
        setError(e.message || "Something went wrong");
        setIsLoading(false);
      }
    }

    fetchPlaces();
  }, []); // Empty dependency array ensures this runs only once on mount

  function onConfirm() {
    setError("");
  }

  if (error.trim() !== "") {
    return <Error title="Error" message={error} onConfirm={onConfirm} />;
  }

  return (
    <Place
      isLoading={isLoading}
      title="Available Places"
      places={avaliablePlace}
      loadingText="Fetching Place data"
      fallbacktext="Detecting your location..."
      onSelectPlace={handleSeclectPlace}
    />
  );
});

export default AvaliablePlace;
