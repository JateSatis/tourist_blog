import { useState, useEffect, useRef } from "react";
import axios from "axios";

import PlaceElement from "../components/PlaceElement";

const MainPage = () => {
  const [places, setPlaces] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dotsAmount, setDotsAmount] = useState(1);

  const headingElement = useRef(null);

  useEffect(() => {
    const headingAnimationInterval = setInterval(() => {
      console.log(dotsAmount);
      setDotsAmount((prevDotsAmount) => (prevDotsAmount + 1) % 4);
    }, 1000);
    setIsLoading(true);
    axios
      .get("http://localhost:3000/places")
      .then((response) => {
        setPlaces(response.data.data.filter((place) => place.review >= 3));
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
        setIsLoading(false);
      });
    return () => clearInterval(headingAnimationInterval);
  }, []);

  return (
    <main className="main">
      <h1 className="main_heading" ref={headingElement}>
        {`Добро пожаловать${Array.from({ length: dotsAmount }, () => ".").join(
          ""
        )}`}
      </h1>
      <h2 className="main_secondary-heading">
        Личный блог увлеченного путешественника. Удивительные места, красивые
        фотографии, размышления по личному опыту и многое другое.
      </h2>
      <h6 className="main_places-heading">Лучшие достопримечательности:</h6>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="main_places-container">
          {places.map((elem, index, array) => (
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
    </main>
  );
};

export default MainPage;
