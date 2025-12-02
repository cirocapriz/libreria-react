import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

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
        <button>Agregar Libro</button>
      </Link>

      <ul>
        {libros.map((libro) => (
          <li key={libro.id}>
            <strong>{libro.titulo}</strong> — {libro.autor}

            <Link to={`/admin/libros/editar/${libro.id}`}>
              <button>Editar</button>
            </Link>

            <button style={{ color: "red" }} onClick={() => eliminarLibro(libro.id)}>
              Eliminar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminLibros;
