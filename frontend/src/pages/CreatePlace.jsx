import axios from "axios";
import { useState, useEffect } from "react";

const CreatePlace = () => {
  const [isFormFulfilled, setIsFormFulfilled] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [place, setPlace] = useState({
    name: "",
    location: "",
    dateOfVisit: "",
    review: "",
    imageFile: null,
  });

  useEffect(() => {
    if (
      place.name != "" &&
      place.location != "" &&
      place.dateOfVisit != "" &&
      place.review != "" &&
      place.imageFile != null
    ) {
      setIsFormFulfilled(true);
    }
  }, [place]);

  const handleImageUpload = async (event) => {
    const file = event.target.files[0];
    const correctFileTypes = ["image/jpg", "image/jpeg", "image/png"];
    if (correctFileTypes.includes(file.type)) {
      setPlace({ ...place, imageFile: file });
    } else {
      alert("Неверный тип файла, пожалуйста, выберите jpg, jpeg или png файл.");
    }
  };

  const handleCreatePlace = () => {
    if (
      !place.name ||
      !place.location ||
      !place.dateOfVisit ||
      !place.review ||
      !place.imageFile
    ) {
      setIsFormFulfilled(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", place.name);
    formData.append("location", place.location);
    formData.append("dateOfVisit", place.dateOfVisit);
    formData.append("review", place.review);
    formData.append("imageFile", place.imageFile);
    setIsLoading(true);
    axios
      .post("http://localhost:3000/places", formData)
      .then(() => {
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="create">
      <input
        placeholder="Название"
        className="form-text-input"
        type="text"
        value={place.name}
        onChange={(e) => setPlace({ ...place, name: e.target.value })}
      />
      <input
        placeholder="Местоположение"
        className="form-text-input"
        type="text"
        value={place.location}
        onChange={(e) => setPlace({ ...place, location: e.target.value })}
      />
      <input
        placeholder="Дата посещения"
        className="form-text-input"
        type="text"
        value={place.dateOfVisit}
        onChange={(e) => setPlace({ ...place, dateOfVisit: e.target.value })}
      />
      <input
        placeholder="Оценка"
        className="form-text-input"
        type="text"
        value={place.review}
        onChange={(e) => setPlace({ ...place, review: e.target.value })}
      />
      <label className="form-button" htmlFor="imageFileCreate">
        Выбрать изображение
      </label>
      <input
        type="file"
        id="imageFileCreate"
        onChange={(e) => handleImageUpload(e)}
      />
      <button className="form-button" onClick={handleCreatePlace}>
        Сохранить
      </button>
      {!isFormFulfilled ? <p>Oops, some values are missing</p> : <></>}
    </div>
  );
};

export default CreatePlace;
