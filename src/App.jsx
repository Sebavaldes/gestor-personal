import "./App.css";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
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

      <TaskForm
        title={title}
        setTitle={setTitle}
        priority={priority}
        setPriority={setPriority}
        createTask={createTask}
      />

      <h2>Mis tareas</h2>

      <div className="filters">
        <button onClick={() => setFilter("all")}>Todas</button>
        <button onClick={() => setFilter("pending")}>Pendiente</button>
        <button onClick={() => setFilter("completed")}>Completadas</button>
      </div>

      <TaskList
        loading={loading}
        filteredTasks={filteredTasks}
        toggleTask={toggleTask}
        deleteTask={deleteTask}
      />
    </div>
  );
}

export default App;