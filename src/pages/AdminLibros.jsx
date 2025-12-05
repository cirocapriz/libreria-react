import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminLibros.css";



const AdminLibros = () => {
  const [libros, setLibros] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLibros = async () => {
      try {
        const res = await fetch("https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros");
        const data = await res.json();
        setLibros(data);
      } catch (err) {
        setError("Error al cargar los libros");
      } finally {
        setLoading(false);
      }
    };

    fetchLibros();
  }, []);

  if (loading) return <p>Cargando libros...</p>;
  if (error) return <p>{error}</p>;


  const eliminarLibro = async (id) => {
  const confirmar = window.confirm("¿Seguro que querés eliminar este libro?");

  if (!confirmar) return;

  try {
    await fetch(
      `https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros/${id}`,
      {
        method: "DELETE",
      }
    );

    // actualizar el estado para que se quite sin refrescar la página
    setLibros(libros.filter((l) => l.id !== id));
  } catch (err) {
    alert("Error eliminando el libro");
  }
};


  return (
    <div>
  <h2>Administración de Libros</h2>

  <Link to="/admin/libros/nuevo">
    <button className="btn-primary">Agregar Libro</button>
  </Link>

  <div className="libros-grid">
    {libros.map((libro) => (
      <div key={libro.id} className="libro-card">
        <h3>{libro.titulo}</h3>
        <p>{libro.autor}</p>
        <div className="acciones">
          <Link to={`/admin/libros/editar/${libro.id}`}>
            <button className="btn-primary">Editar</button>
          </Link>
          <button
            className="btn-danger"
            onClick={() => eliminarLibro(libro.id)}
          >
            Eliminar
          </button>
        </div>
      </div>
    ))}
  </div>
</div>


  );
};

export default AdminLibros;
