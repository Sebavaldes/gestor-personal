const express = require("express");
const cors = require("cors");

const app = express();

// Permite comunicación con frontend
app.use(cors());

// Ruta de prueba
app.get("/", (req, res) => {
  res.send("Hola desde el backend 🚀");
});

// Puerto
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});