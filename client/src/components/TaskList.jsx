import { useEffect, useState } from 'react';
import { getTasks } from '../api/api';  
import { useNavigate } from 'react-router-dom';

function TaskList() {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function loadTasks() {
      try {
        const data = await getTasks();  // Llama a la función que devuelve los datos directamente
        setTasks(data);  // Asigna los datos al estado
      } catch (error) {
        console.error('Error al cargar las tareas:', error);
      }
    }
    loadTasks();
  }, []);

  return (
    <div className="container mt-5">
      <h1 className="text-center mb-4">Lista de Tareas</h1>
      {tasks.map(task => (
        <div 
          key={task.id} 
          className="card mb-3 shadow-sm"
          onClick={() => navigate(`/tasks/${task.id}`)}  // Uso de backticks para interpolar el id
        >
          <div className="card-body">
            <h2 className="card-title">{task.title}</h2>
            <p className="card-text">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
