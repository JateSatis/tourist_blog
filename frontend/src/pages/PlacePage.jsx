import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const PlacePage = () => {
  const [place, setPlace] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const { id } = useParams();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:3000/places/${id}`)
      .then((response) => {
        setPlace(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  return (
    <div className="page">
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          <div className="page_img-container">
            <img
              className="page_img"
              src={
                place.imageFilename
                  ? `http://localhost:3000/images/${place.imageFilename}`
                  : null
              }
              alt=""
            />
          </div>
          <div className="page_info-container">
            <h1 className="page_info-name">{place.name}</h1>
            <h2 className="page_info-location">
              Местонахождение: {place.location}
            </h2>
            <h2 className="page_info-date">Дата визита: {place.dateOfVisit}</h2>
            <h2 className="page_info-review">Оценка: {place.review}</h2>
          </div>
        </>
      )}
    </div>
  );
};

export default PlacePage;
