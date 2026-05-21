import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const getTasks = async () => {
    const response = await fetch("http://localhost:3000/tasks");
    const data = await response.json();
    setTasks(data);
  };

  const createTask = async (e) => {
    e.preventDefault();

    if (title.trim() === "") return;

    await fetch("http://localhost:3000/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title }),
    });

    setTitle("");
    getTasks();
  };

  const toggleTask = async (task) => {
    await fetch(`http://localhost:3000/tasks/${task._id}` , {
      method: "PUT",
      headers: {
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({ completed: !task.completed}),
    });

    getTasks();
  };

  const deleteTask = async (id) => {
    await fetch(`http://localhost:3000/tasks/${id}`, {
      method: "DELETE",
    });

    getTasks();
  }

  useEffect(() => {
    getTasks();
  }, []);

  return (
    <div className="app">
      <h1>Gestor Personal</h1>

      <form onSubmit={createTask}>
        <input
          type="text"
          placeholder="Escribe una tarea"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <button className="add-btn" type="submit">Agregar</button>
      </form>

      <h2>Mis tareas</h2>

      <ul className="task-list">
        {tasks.map((task) => (
          <li className="task-item" key={task._id}>
            <span className={task.completed ? "completed" : ""}>
                {task.title}
              </span>
            <div className="task-buttons">            
              <button onClick={() => toggleTask(task)}> 
                {task.completed ? "Desmarcar" : "Completar"}
              </button>

              <button onClick={() => deleteTask(task._id)}>
                Eliminar
              </button>
            </div>

            </li>
        ))}
      </ul>
    </div>
  );
}

export default App;