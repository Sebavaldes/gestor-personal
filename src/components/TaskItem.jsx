function TaskItem({ task, toggleTask, deleteTask }) {
  return (
    <li className="task-item">
      <div>
        <span className={task.completed ? "completed" : ""}>
          {task.title}
        </span>

        <br />

        <small>Prioridad: {task.priority}</small>
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
  );
}

export default TaskItem;