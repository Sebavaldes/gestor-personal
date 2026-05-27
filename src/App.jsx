import "./App.css";
import { useEffect, useState } from "react";
import { getTasksRequest, createTaskRequest, updateTaskRequest, deleteTaskRequest } from "./services/taskService";

function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [filter, setFilter] = useState("all");
  const [priority, setPriority] = useState("normal");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

    const getTasks = async () => {
      try{
        setLoading(true);

        const data = await getTasksRequest();

        setTasks(data);
        setError("");
      } catch {
        setError("No pudimos cargar las tareas");
      } finally {
        setLoading(false);
      }
    };
  

  const createTask = async (e) => {
    e.preventDefault();

    if (title.trim() === "") return;

    await createTaskRequest({
      title,
      priority,
    });

    setTitle("");
    setPriority("normal");
    await getTasks();
  };

  const toggleTask = async (task) => {
    await updateTaskRequest(task._id, !task.completed);

    getTasks();
  };

  const deleteTask = async (id) => {
    const confirmDelete = confirm(
      "¿Seguro que quieres eliminar esta tarea?"
    );

    if(!confirmDelete) return;

    await deleteTaskRequest(id);

    getTasks();
  };

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
      {error && <p>{error}</p>}

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
        {loading ? (
          <p>Cargando tareas...</p>
        ) : filteredTasks.length === 0 ? (
          <p>No hay tareas todavía</p>
        ) : (
          filteredTasks.map((task) => (
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
          ))
        )}
      </ul>
    </div>
  );
}

export default App;