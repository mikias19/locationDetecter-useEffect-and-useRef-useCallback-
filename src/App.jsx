import logoImage from "../src/assets/logo.png";
import { AVAILABLE_PLACES } from "./data";
import Place from "./Components/Place";
import { useState, useCallback, useEffect } from "react";
import Modal from "./Components/modal/Modal";
import DeleteModal from "./Components/DeletModal/DeleteModal";
// import { sortOlacesByDistance } from "./loc";
import AvaliablePlace from "./Components/AvaliablePlace/AvaliablePlace";
import { fetchSelectedPlace, fetchUserPlace } from "./http";
import Error from "./Components/Error/Error";
// const storedId = JSON.parse(localStorage.getItem("selectedPlace")) || [];
// const storePlace =
//   storedId &&
//   storedId.map((id) => AVAILABLE_PLACES.find((place) => place.id === id));
export default function App() {
  const [placeToVisit, setPlaceToVisit] = useState([]);
  const [deletePlace, setDeletedPlace] = useState(null);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  // const modalDialog = useRef();

  // async function handleSeclectPlace(place) {
  //   setPlaceToVisit((prevPlace) => {
  //     const existedPlace = prevPlace.find((places) => places.id === place.id);
  //     if (!existedPlace) {
  //       const updatedPlaces = [...prevPlace, place];
  //       fetchSelectedPlace(updatedPlaces).catch((e) => {
  //         setError(e.message || "Something went wrong");
  //       });
  //       return updatedPlaces;
  //     }
  //     return prevPlace;
  //   });
  //   try {
  //     await fetchSelectedPlace([...placeToVisit, place]);
  //   } catch (e) {
  //     setPlaceToVisit(placeToVisit);
  //     setError(e.message || "some thing went Wrong");
  //   }

  // const storedId = JSON.parse(localStorage.getItem("selectedPlace")) || [];

  // if (storedId.indexOf(place.id) === -1) {
  //   localStorage.setItem(
  //     "selectedPlace",
  //     JSON.stringify([place.id, ...storedId])
  //   );
  // }

  // }

  useEffect(() => {
    async function fetchSelectUsersPlace() {
      const resp = await fetchUserPlace();

      setPlaceToVisit(resp);
    }
    fetchSelectUsersPlace();
  }, []);
  const handleSeclectPlace = useCallback(async (place) => {
    setPlaceToVisit((prevPlace) => {
      const existedPlace =
        prevPlace && prevPlace.find((places) => places.id === place.id);
      if (!existedPlace) {
        const updatedPlaces = [...prevPlace, place];
        fetchSelectedPlace(updatedPlaces).catch((e) => {
          setError(e.message || "Something went wrong");
        });
        return updatedPlaces;
      }
      return prevPlace;
    });
  }, []);
  function handleDeletedPlace(oldPlace) {
    setDeletedPlace(oldPlace);
    // modalDialog.current.open();
    setIsModalOpen(true);
  }

  async function handelDelation() {
    if (deletePlace) {
      setPlaceToVisit((prePlace) => {
        return prePlace.filter((place) => place.id !== deletePlace.id);
      });
      console.log(placeToVisit);
      const filteredData = placeToVisit.filter(
        (place) => place.id !== deletePlace.id
      );
      await fetchSelectedPlace(filteredData);
      //   const storedId = JSON.parse(localStorage.getItem("selectedPlace")) || [];

      //   localStorage.setItem(
      //     "selectedPlace",
      //     JSON.stringify(storedId.filter((id) => deletePlace.id !== id))
      //   );
      // }
      setDeletedPlace(null);
      // modalDialog.current.close();
      setIsModalOpen(false);
    }
  }

  function closeModal() {
    // modalDialog.current.close();
    setIsModalOpen(false);
    setDeletedPlace(null);
  }

  // useEffect(() => {
  //   navigator.geolocation.getCurrentPosition((position) => {
  //     const soretedPLace = sortOlacesByDistance(
  //       AVAILABLE_PLACES,
  //       position.coords.latitude,
  //       position.coords.longitude
  //     );
  //     setAvaliablePlace(soretedPLace);
  //   });
  // }, []);

  // useEffect(() => {
  //   async function handleFetchData() {
  //     const res = await fetch("https:localhost:3000/places");
  //     const places = await res.body();
  //     setAvaliablePlace(places);
  //   }
  //   handleFetchData();
  // }, []);

  function onConfirm() {
    setError("");
  }
  if (error.trim() !== "") {
    return (
      <Error title="An Error Occured" message={error} onConfirm={onConfirm} />
    );
  }

  return (
    <div className="bg-gradient-to-t from-neutral-900 to-neutral-900 m-0 p-2">
      <Modal open={isModalOpen}>
        {isModalOpen ? (
          <DeleteModal removeAddPlace={handelDelation} onCancel={closeModal} />
        ) : (
          ""
        )}
      </Modal>
      <header className="flex flex-col items-center justify-center mt-2">
        <img
          className="w-[80px] h-[80px] object-contain drop-shadow-xl"
          src={logoImage}
          alt="this is logo"
        />
        <h1 className="m-0 text-[48px] uppercase text-sky-100 ">
          Place Picker
        </h1>
        <p className="text-gray-400">
          Create Your Personal Collection of places you would like to visit or
          you have visted
        </p>
      </header>
      <main>
        <Place
          title="i'd like to vist..."
          places={placeToVisit}
          fallbacktext="add place you wan to visit"
          onSelectPlace={handleDeletedPlace}
        />
        <AvaliablePlace handleSeclectPlace={handleSeclectPlace} />
        {/* <Place
          title="Avaliable Places"
          places={avaliablePlace}
          fallbacktext="detecting you loction..."
          onSelectPlace={handleSeclectPlace}
        /> */}
      </main>
    </div>
  );
}
