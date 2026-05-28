function TaskForm({
  title,
  setTitle,
  priority,
  setPriority,
  createTask,
}) {
  return (
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

      <button className="add-btn" type="submit">
        Agregar
      </button>
    </form>
  );
}

export default TaskForm;