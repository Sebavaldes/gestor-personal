const API = import.meta.env.VITE_API_URL;

export const getTasksRequest = async () => {
  const response = await fetch(`${API}/tasks`);
  return response.json();
};

export const createTaskRequest = async (task) => {
  const response = await fetch(`${API}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(task),
  });

  return response.json();
};

export const updateTaskRequest = async (id, completed) => {
    const response = await fetch(`${API}/tasks/${id}`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ completed }),
    });

    return response.json();
}

export const deleteTaskRequest = async (id) => {
// conexión MongoDB
    const response = await fetch(`${API}/tasks/${id}`, {
    method: "DELETE",
  });

  return response.json();
};