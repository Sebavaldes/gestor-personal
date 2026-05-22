import "./App.css";
import { useEffect, useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("normal");

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
      body: JSON.stringify({ title, priority }),
    });

    setTitle("");
    setPriority("normal");
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

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") return task.completed;
    if (filter === "pending") return !task.completed;
    return true;
  })

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
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="baja">Baja</option>
          <option value="normal">Normal</option>
          <option value="alta">Alta</option>
        </select>

        <button className="add-btn" type="submit">Agregar</button>
      </form>

      <h2>Mis tareas</h2>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendiente</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
      </div>

      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li className="task-item" key={task._id}>
            <div>
              <span className={task.completed ? "completed" : ""}>
                  {task.title}
              </span>

              <br />
              
              <small>
                Prioridad: {task.priority}
              </small>
            </div>
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