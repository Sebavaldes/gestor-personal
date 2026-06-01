import { useState } from "react";

function TaskItem({ task, toggleTask, deleteTask, editTask }) {
  const [isEditing, setIsEditing] = useState(false);
  const [newTitle, setNewTitle] = useState(task.title);

  const handleSave = async () => {
    await editTask(task._id, newTitle);
    setIsEditing(false);
  };

  return (
    <li className="task-item">
      <div>
        {isEditing ? (
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
        ) : (
          <span className={task.completed ? "completed" : ""}>
            {task.title}
          </span>
        )}

        <br />

        <small>Prioridad: {task.priority}</small>
      </div>

      <div className="task-buttons">
        {isEditing ? (
          <>
            <button onClick={handleSave}>Guardar</button>
            <button onClick={() => setIsEditing(false)}>Cancelar</button>
          </>
        ) : (
          <>
            <button onClick={() => toggleTask(task)}>
              {task.completed ? "Desmarcar" : "Completar"}
            </button>

            <button onClick={() => setIsEditing(true)}>
              Editar
            </button>

            <button onClick={() => deleteTask(task._id)}>
              Eliminar
            </button>
          </>
        )}
      </div>
    </li>
  );
}

export default TaskItem;