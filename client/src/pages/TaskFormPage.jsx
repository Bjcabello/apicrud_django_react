import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { createTask, updateTask, getTask, deleteTask } from '../api/api';  
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const TaskFormPage = () => {
  const { register, handleSubmit, setValue, reset, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const params = useParams();
  const [loading, setLoading] = useState(true);

  // Función para manejar el envío del formulario
  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      try {
        await updateTask(params.id, data);
        console.log('Tarea actualizada');
      } catch (error) {
        console.error('Error al actualizar la tarea:', error);
      }
    } else {
      try {
        await createTask(data);
        console.log('Tarea creada');
      } catch (error) {
        console.error('Error al crear la tarea:', error);
      }
    }
    navigate("/tasks");
  });

  // Cargar los datos de la tarea en modo edición
  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        try {
          const res = await getTask(params.id);
          setValue("title", res.title);
          setValue("description", res.description);
        } catch (error) {
          console.error("Error cargando la tarea:", error);
        }
      } else {
        reset({
          title: '',
          description: ''
        });
      }
      setLoading(false);
    }
    loadTask();
  }, [params.id, setValue, reset]);

  // Función para eliminar la tarea sin confirmación
  const handleDelete = async () => {
    try {
      await deleteTask(params.id);  // Asegúrate de que el ID es correcto y la API lo reconoce
      console.log('Tarea eliminada');
      navigate("/tasks");
    } catch (error) {
      console.error('Error al eliminar la tarea:', error);
    }
  };

  if (loading) {
    return <p>Cargando...</p>;
  }

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3">
          <h1 className="text-center mb-4">{params.id ? "Editar Tarea" : "Crear Tarea"}</h1>
          <form onSubmit={onSubmit}>
            <div className="form-group mb-3">
              <input 
                type="text" 
                className="form-control"
                placeholder="Título" 
                {...register("title", { required: true })} 
              />
              {errors.title && <span className="text-danger">Este campo es requerido</span>}
            </div>
            
            <div className="form-group mb-3">
              <textarea 
                rows="3" 
                className="form-control"
                placeholder="Descripción" 
                {...register("description", { required: true })}
              />
              {errors.description && <span className="text-danger">Este campo es requerido</span>}
            </div>

            <button type="submit" className="btn btn-primary w-100 mb-3">
              {params.id ? "Actualizar" : "Guardar"}
            </button>
          </form>

          {params.id && (
            <button 
              className="btn btn-danger w-100"
              onClick={handleDelete}
            >
              Eliminar
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default TaskFormPage;
