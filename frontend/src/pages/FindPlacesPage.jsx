import { useState, useEffect } from "react";
import axios from "axios";

import PlaceElement from "../components/PlaceElement";

import { IoSearch } from "react-icons/io5";
import { IoClose } from "react-icons/io5";

const FindPlacesPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [places, setPlaces] = useState([]);
  const [filteredPlaces, setFilteredPlaces] = useState([]);
  const [placeNameInput, setPlaceNameInput] = useState("");

  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:3000/places")
      .then((response) => {
        setPlaces(response.data.data);
        setFilteredPlaces(response.data.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
  }, []);

  const updatePlaces = () => {
    if (placeNameInput != "") {
      setFilteredPlaces(
        [...places].filter((place) => place.name == placeNameInput)
      );
    }
  };

  const clearSearch = () => {
    setFilteredPlaces(places);
    setPlaceNameInput("");
  };

  return (
    <div className="find">
      <div className="find_search-container">
        <input
          className="find_search-bar"
          type="text"
          value={placeNameInput}
          onChange={(e) => setPlaceNameInput(e.target.value)}
        />
        <button className="button find_search-button" onClick={updatePlaces}>
          <IoSearch />
        </button>
        <button className="button find_clear-button" onClick={clearSearch}>
          <IoClose />
        </button>
      </div>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div>
          {filteredPlaces.map((elem, index, array) => (
            <PlaceElement
              key={elem._id}
              data={elem}
              array={array}
              indexToRemove={index}
              setData={setPlaces}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default FindPlacesPage;
