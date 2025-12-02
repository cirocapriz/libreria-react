import { useState } from "react";
import { useNavigate } from "react-router-dom";

const NuevoLibro = () => {
  const navigate = useNavigate();

  const [titulo, setTitulo] = useState("");
  const [autor, setAutor] = useState("");
  const [precio, setPrecio] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [categoria, setCategoria] = useState("");
  const [anio, setAnio] = useState("");

  const [error, setError] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // VALIDACIONES
    if (!titulo.trim()) return setError("El título es obligatorio.");
    if (!autor.trim()) return setError("Falta el autor.");
    if (precio <= 0) return setError("El precio debe ser mayor a 0.");
    if (descripcion.length < 10)
      return setError("La descripción debe tener al menos 10 caracteres.");
    if (!categoria.trim()) return setError("La categoría es obligatoria.");
    if (!anio) return setError("El año es obligatorio.");
    if (anio < 1500 || anio > new Date().getFullYear())
      return setError("El año no es válido.");

    
    try {
      const res = await fetch(
        "https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            titulo,
            autor,
            precio,
            descripcion,
            imagen,
            categoria,
            anio
          }),
        }
      );

      if (!res.ok) throw new Error("Error en la API");

      navigate("/admin/libros"); // Volver al listado
    } catch (err) {
      setError("Error al crear el libro.");
    }
  };



  return (
    <div className="container mt-4" style={{ maxWidth: "600px" }}>
      <h2 className="mb-4">Agregar Nuevo Libro</h2>

      {/* Error */}
      {error && <div className="alert alert-danger py-2">{error}</div>}

      <form onSubmit={handleSubmit} className="d-flex flex-column gap-3">

        <div>
          <label className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            placeholder="Ingrese el título del libro"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">Autor</label>
          <input
            type="text"
            className="form-control"
            placeholder="Agregue el nombre del escritor"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
          />
        </div>

        <div>
          <label className="form-label">Precio</label>
          <input
            type="number"
            className="form-control"
            placeholder="Valor mayor a 0"
            value={precio}
            onChange={(e) => setPrecio(Number(e.target.value))}
            min="1"
          />
        </div>

        <div>
          <label className="form-label">Descripción</label>
          <textarea
            className="form-control"
            placeholder="10 caracteres mínimo de detalles del libro"
            rows="3"
            value={descripcion}
            onChange={(e) => setDescripcion(e.target.value)}
          ></textarea>
        </div>

        <div>
          <label className="form-label">Categoría</label>
          <input
            type="text"
            className="form-control"
            placeholder="Categoría (Ej: Novela, Ciencia Ficción...)"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            
          />
        </div>

        <div>
          <label className="form-label">Año</label>
          <input
            type="number"
            className="form-control"
            placeholder="Año de publicación"
            value={anio}
            onChange={(e) => setAnio(Number(e.target.value))}
            min="1"
          />
        </div>

        <div>
          <label className="form-label">URL de portada</label>
          <input
            type="text"
            className="form-control"
            placeholder="Website de la portada del libro"
            value={imagen}
            onChange={(e) => setImagen(e.target.value)}
          />
        </div>

        {/* Vista previa si hay portada */}
        {imagen && (
          <div className="text-center">
            <img
              src={imagen}
              alt="Portada"
              width="150"
              className="rounded shadow"
            />
          </div>
        )}

        <div className="d-flex gap-3 mt-3">
          <button className="btn btn-success w-50" type="submit">
            Crear Libro
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

export default NuevoLibro;

