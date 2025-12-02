import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const EditarLibro = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [libro, setLibro] = useState({
    titulo: "",
    autor: "",
    precio: "",
    descripcion: "",
    categoria: "",
    anio: "",
    portada: "",
  });

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Cargar datos
  useEffect(() => {
    const fetchLibro = async () => {
      try {
        const res = await fetch(
          `https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros/${id}`
        );
        const data = await res.json();

        setLibro({
          titulo: data.titulo || data.name || "",
          autor: data.autor || "",
          precio: data.precio || "",
          descripcion: data.descripcion || "",
          categoria: data.categoria || "",
          anio: data.anio || "",
          portada: data.portada || data.imagen || "",
        });
      } catch (err) {
        setError("Error al cargar los datos del libro");
      } finally {
        setLoading(false);
      }
    };

    fetchLibro();
  }, [id]);

  // Guardar cambios
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validaciones
    if (!libro.titulo.trim()) return setError("El título es obligatorio");
    if (!libro.autor.trim()) return setError("El autor es obligatorio");
    if (libro.precio <= 0) return setError("El precio debe ser mayor a 0");
    if (libro.descripcion.length < 10)
      return setError("La descripción debe tener al menos 10 caracteres");
    if (!libro.categoria.trim()) return setError("La categoría es obligatoria.");
    if (!libro.anio) return setError("El año es obligatorio.");
    if (libro.anio < 1500 || libro.anio > new Date().getFullYear())
      return setError("El año no es válido.");

    try {
      const res = await fetch(
        `https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros/${id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(libro),
        }
      );

      if (!res.ok) throw new Error();

      navigate("/admin/libros");
    } catch (err) {
      setError("No se pudo actualizar el libro");
    }
  };

  const handleChange = (e) => {
    setLibro({
      ...libro,
      [e.target.name]: e.target.value,
    });
  };

  if (loading)
    return (
      <div className="text-center mt-5">
        <div className="spinner-border" role="status"></div>
        <p>Cargando libro...</p>
      </div>
    );

  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Editar Libro</h2>

      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">
        <div>
          <label className="form-label">Título</label>
          <input
            name="titulo"
            className="form-control"
            value={libro.titulo}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Autor</label>
          <input
            name="autor"
            className="form-control"
            value={libro.autor}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Precio</label>
          <input
            name="precio"
            type="number"
            className="form-control"
            value={libro.precio}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div>
          <label className="form-label">Descripción</label>
          <textarea
            name="descripcion"
            className="form-control"
            rows="3"
            value={libro.descripcion}
            onChange={handleChange}
          ></textarea>
        </div>

        <div>
          <label className="form-label">Categoría</label>
          <input
            name="categoria"
            className="form-control"
            value={libro.categoria}
            onChange={handleChange}
          />
        </div>

        <div>
          <label className="form-label">Año</label>
          <input
            name="anio"
            type="number"
            className="form-control"
            value={libro.anio}
            onChange={handleChange}
            min="1"
          />
        </div>

        <div>
          <label className="form-label">URL de la portada</label>
          <input
            name="portada"
            className="form-control"
            value={libro.portada}
            onChange={handleChange}
          />
        </div>

        {libro.portada && (
          <div className="text-center">
            <img
              src={libro.portada}
              alt="Portada"
              width="150"
              className="rounded shadow"
            />
          </div>
        )}

        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-primary w-50" type="submit">
            Guardar Cambios
          </button>
          <button
            type="button"
            className="btn btn-secondary w-50"
            onClick={() => navigate("/admin/libros")}
          >
            Volver
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditarLibro;
