import axios from "axios";

import { useState, useEffect } from "react";

import { MdDelete } from "react-icons/md";

const DeletePlaceButton = ({ id, elementDeletedAction }) => {
  const handleDeletePlace = () => {
    axios
      .delete(`http://localhost:3000/places/${id}`)
      .then(() => {
        elementDeletedAction();
      })
      .catch((error) => {
        alert("Что-то пошло не так. Для подробностей посмотрите в консоль");
        console.log(error.message);
      });
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
    <div
      onClick={(e) => {
        e.stopPropagation();
        handleDeletePlace();
      }}
    >
      {screenWidth > 600 ? "Удалить" : ""}
      <MdDelete className="place-element_change-icon" />
    </div>
  );
};

export default DeletePlaceButton;
