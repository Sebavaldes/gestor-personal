import TaskItem from "./TaskItem";

function TaskList({
  loading,
  filteredTasks,
  toggleTask,
  deleteTask,
  editTask,
}) {
  if (loading) {
    return <p>Cargando tareas...</p>;
  }

  if (filteredTasks.length === 0) {
    return <p>No hay tareas todavía</p>;
  }

  return (
    <ul className="task-list">
      {filteredTasks.map((task) => (
        <TaskItem
          key={task._id}
          task={task}
          toggleTask={toggleTask}
          deleteTask={deleteTask}
          editTask={editTask}
        />
      ))}
    </ul>
  );
}

export default TaskList;