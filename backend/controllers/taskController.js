const Task = require("../models/Task");

const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();

    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({
      message: "Error al obtener tareas",
      error: error.message,
    });
  }
};

const createTask = async (req, res) => {
  try {
    const newTask = new Task({
      title: req.body.title,
      priority: req.body.priority,
    });

    const savedTask = await newTask.save();

    res.status(201).json(savedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error al crear tarea",
      error: error.message,
    });
  }
};

const deleteTask = async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Tarea eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      message: "Error al eliminar la tarea",
      error: error.message,
    });
  }
};

const updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      { completed: req.body.completed },
      { returnDocument: "after",}
    );

    res.status(200).json(updatedTask);
  } catch (error) {
    res.status(500).json({
      message: "Error al actualizar la tarea",
      error: error.message,
    });
  }
};

module.exports = {
  getTasks,
  createTask,
  updateTask,
  deleteTask,
};