import express from "express";
import multer from "multer";

import { Places } from "../models/placeModel.js";

const placesRouter = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./assets/images");
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const uploadImages = multer({ storage });

// Возвращает все места из базы данных
placesRouter.get("/", async (request, response) => {
  try {
    const places = await Places.find({});
    return response.status(200).json({
      count: places.length,
      data: places,
    });
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Возвращает место по идентификатору
placesRouter.get("/:id", async (request, response) => {
  try {
    const { id } = request.params;
    const place = await Places.findById(id);
    if (!place) {
      return response.status(404).send({ message: "No place with such id" });
    }
    return response.status(200).json(place);
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

// Создает новое место в базе данных
placesRouter.post(
  "/",
  uploadImages.single("imageFile"),
  async (request, response) => {
    try {
      if (
        !request.body.name ||
        !request.body.location ||
        !request.body.dateOfVisit ||
        !request.body.review ||
        !request.file
      ) {
        return response.status(400).send({
          message: "Not all fields were provided",
        });
      }

      const imageFilename = request.file.filename;

      const newPlace = {
        name: request.body.name,
        location: request.body.location,
        dateOfVisit: request.body.dateOfVisit,
        review: request.body.review,
        imageFilename: imageFilename,
      };

      const place = await Places.create(newPlace);
      return response.status(200).send("Place created successfully");
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }
);

// Обновляет данные в место по идентификатору
placesRouter.put(
  "/:id",
  uploadImages.single("imageFile"),
  async (request, response) => {
    try {
      if (
        !request.body.name ||
        !request.body.location ||
        !request.body.dateOfVisit ||
        !request.body.review
      ) {
        return response.status(400).send({
          message: "Not all fields were provided",
        });
      }

      const { id } = request.params;

      const newPlace = {
        name: request.body.name,
        location: request.body.location,
        dateOfVisit: request.body.dateOfVisit,
        review: request.body.review,
        imageFilename: "",
      };

      if (!request.file) {
        const place = await Places.findById(id);
        newPlace.imageFilename = place.imageFilename;
      } else {
        newPlace.imageFilename = request.file.filename;
      }

      const updatedPlace = await Places.findByIdAndUpdate(id, newPlace);

      if (!updatedPlace) {
        return response.status(404).send("No place with such id");
      }

      return response.status(200).send("Place updated successfully");
    } catch (error) {
      return response.status(500).send({ message: error.message });
    }
  }
);

// Удаляет место из базы данных по идентификатору
placesRouter.delete("/:id", async (request, response) => {
  try {
    const { id } = request.params;

    const place = await Places.findByIdAndDelete(id);

    if (!place) {
      return response.status(404).send("No place with such id");
    }

    return response.status(200).send("Place deleted successfully");
  } catch (error) {
    return response.status(500).send({ message: error.message });
  }
});

export default placesRouter;
