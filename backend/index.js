import express from "express";

import { PORT, mongoDBURL } from "./config.js";
import mongoose from "mongoose";

import cors from "cors";

import placesRoute from "./routes/placesRoute.js";

const app = express();

// Middleware: позволяет нам обрабатывать json формат внутри функций http запросов
app.use(express.json());

// Middleware: дает возможность делать запросы со сторонних ресурсов (в нашем случае React)
app.use(cors());

// Позволяет получать путь к файлам в папке assets напрямую из адреса сервера localhost:3000/
app.use(express.static("assets"));

app.get("/", (request, response) => {
  console.log(request);
  return response.status(200).send("Welcome to the main page");
});

// Создает маршрутизацию для работы со схемой places из базы данных
app.use("/places", placesRoute);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log("App is connected to database");
    app.listen(PORT, () => {
      console.log(`The server is up and running at port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(error.message);
  });
