import TaskItem from "./TaskItem";

function TaskList({
  loading,
  filteredTasks,
  toggleTask,
  deleteTask,
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
        />
      ))}
    </ul>
  );
}

export default TaskList;