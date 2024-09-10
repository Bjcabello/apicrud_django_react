import axios from 'axios';

const tasksApi = axios.create({
  baseURL: 'http://localhost:8000/tasks/api/v1/tasks'  // Asegúrate de que esta URL es la correcta
});

// Obtener todas las tareas
export const getTasks = async () => {
  try {
    const response = await tasksApi.get("/");
    return response.data;
  } catch (error) {
    console.error("Error al obtener las tareas:", error);
    throw error;
  }
};

// Obtener una tarea por ID
export const getTask = async (id) => {
  try {
    const response = await tasksApi.get(`/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error al obtener la tarea con id ${id}:`, error);
    throw error;
  }
};

// Crear una nueva tarea
export const createTask = async (task) => {
  try {
    const response = await tasksApi.post("/", task);
    return response.data;
  } catch (error) {
    console.error("Error al crear la tarea:", error);
    throw error;
  }
};

// Actualizar una tarea existente
export const updateTask = async (id, updatedTask) => {
  try {
    const response = await tasksApi.put(`/${id}/`, updatedTask);
    return response.data;
  } catch (error) {
    console.error(`Error al actualizar la tarea con id ${id}:`, error);
    throw error;
  }
};

// Eliminar una tarea
export const deleteTask = async (id) => {
  try {
    const response = await tasksApi.delete(`/${id}/`); // Añadir barra diagonal al final
    return response.data;
  } catch (error) {
    console.error(`Error al eliminar la tarea con id ${id}:`, error);
    throw error;
  }
};