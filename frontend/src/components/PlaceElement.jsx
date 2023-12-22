import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import DeletePlaceButton from "./DeletePlaceButton";

import { FaEdit } from "react-icons/fa";

const PlaceElement = ({ data, array, indexToRemove, setData }) => {
  const updatePlaces = () => {
    const updatedPlaces = [...array].filter(
      (elem, index) => index !== indexToRemove
    );
    setData(updatedPlaces);
  };

  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Function to update screenWidth state when the window is resized
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <Link className="place-element" to={`/places/details/${data._id}`}>
      <div className="place-element_info">
        <div className="place-element_img-container">
          <img
            src={`http://localhost:3000/images/${data.imageFilename}`}
            alt=""
            className="place-element_img"
          />
        </div>
        <div className="place-element_place-info">
          <div>{data.name}</div>
        </div>
      </div>
      <div className="place-element_change">
        <Link
          to={`/places/edit/${data._id}`}
          className="place-element_change-button"
        >
          {screenWidth > 600 ? "Изменить" : ""}
          <FaEdit className="place-element_change-icon" />
        </Link>
        <Link to="/find" className="place-element_change-button">
          <DeletePlaceButton
            id={data._id}
            elementDeletedAction={updatePlaces}
          />
        </Link>
      </div>
    </Link>
  );
};

export default PlaceElement;
