const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
require("dotenv").config();

const Task = require("./models/Taks")

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

app.post("/tasks", async(req, res) =>{
  try{
    const newTask = new Task({
      title: req.body.title,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear la tarea",
      error: error.message,
    });
  }
});

app.get("/tasks", async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch(error) {
    res.status(500).json({
      message: "Error al obtener las tareas",
      error: error.message,
    });
  }
});

// Puerto
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});