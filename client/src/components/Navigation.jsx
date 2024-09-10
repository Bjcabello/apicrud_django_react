import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <Link to="/tasks" className="text-decoration-none">
          <h1 className="text-primary">Tareas</h1>
        </Link>
        <Link to="/tasks/create" className="btn btn-success">
          Crear Tarea
        </Link>
      </div>
    </div>
  );
}

export default Navigation;
