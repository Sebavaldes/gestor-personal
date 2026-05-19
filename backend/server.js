const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const app = express();

// Permite comunicación con frontend
app.use(cors());
app.use(express.json());

// conexión MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("Conectado a MongoDB"))
  .catch((error) => console.log("Error al conectar", error));

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Hola desde el backend 🚀");
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});