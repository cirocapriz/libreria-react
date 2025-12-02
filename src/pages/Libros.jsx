

import { useState, useEffect, useContext } from "react";
import { CartContext } from "../context/CartContext";
import BookCard from "../components/BookCard";

const Libros = () => {
  const [libros, setLibros] = useState([]);
  const [search, setSearch] = useState("");
  const [categoria, setCategoria] = useState("todas");
  const [anioMin, setAnioMin] = useState(0);
  const [orden, setOrden] = useState("");

  const [paginaActual, setPaginaActual] = useState(1);
  const librosPorPagina = 8;

  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetch("https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros")
      .then((res) => res.json())
      .then((data) => setLibros(data));
  }, []);

  const categorias = ["todas", ...new Set(libros.map(x => x.categoria).filter(Boolean))];
  const anioMinimo = Math.min(...libros.map(x => Number(x.anio) || 0));

  const librosFiltrados = libros
    .filter(libro => {
      const texto = search.toLowerCase();
      return (
        libro.titulo?.toLowerCase().includes(texto) ||
        libro.autor?.toLowerCase().includes(texto) ||
        libro.categoria?.toLowerCase().includes(texto)
      );
    })
    .filter(libro => categoria === "todas" || libro.categoria === categoria)
    .filter(libro => !anioMin || Number(libro.anio) >= anioMin);

  if (orden === "asc") librosFiltrados.sort((a, b) => a.precio - b.precio);
  if (orden === "desc") librosFiltrados.sort((a, b) => b.precio - a.precio);

  // ---- Paginación ----
  const totalPaginas = Math.ceil(librosFiltrados.length / librosPorPagina);

  const inicio = (paginaActual - 1) * librosPorPagina;
  const librosPaginados = librosFiltrados.slice(inicio, inicio + librosPorPagina);

  const irAPagina = (num) => {
    if (num >= 1 && num <= totalPaginas) setPaginaActual(num);
  };

  // Resetear a página 1 si cambian los filtros
  useEffect(() => {
    setPaginaActual(1);
  }, [search, categoria, anioMin, orden]);



  return (
    <div className="container py-4">
      <h2 className="mb-4">Todos los Libros</h2>

      {/* Buscador */}
      <input
        type="text"
        placeholder="Buscar por título, autor o categoría..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="form-control mb-3"
        style={{ maxWidth: "400px" }}
      />

      {/* Filtros */}
      <div className="row g-3 mb-4">

        <div className="col-12 col-md-4">
          <label className="form-label fw-bold">Categoría</label>
          <select
            className="form-select"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            {categorias.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label fw-bold">
            Año mínimo: {anioMin}
          </label>
          <input
            type="range"
            className="form-range"
            min={anioMinimo}
            max={new Date().getFullYear()}
            value={anioMin}
            onChange={(e) => setAnioMin(Number(e.target.value))}
          />
        </div>

        <div className="col-12 col-md-4">
          <label className="form-label fw-bold">Ordenar por precio</label>
          <select
            className="form-select"
            value={orden}
            onChange={(e) => setOrden(e.target.value)}
          >
            <option value="">Sin orden</option>
            <option value="asc">Menor a mayor</option>
            <option value="desc">Mayor a menor</option>
          </select>
        </div>

      </div>

      {/* -------- LISTA PAGINADA -------- */}
      <div className="container mt-4">
        <div className="row g-3">
          {librosPaginados.map((libro) => (
            <div key={libro.id} className="col-12 col-sm-6 col-md-4 col-lg-3">
            <BookCard libro={libro} onAddToCart={addToCart} />
          </div>
        ))}

          {librosPaginados.length === 0 && (
              <p>No se encontraron libros con esos filtros.</p>
            )}
            </div>
          </div>

         


      

      
      <div className="d-flex flex-wrap gap-2 mt-4">
        <button onClick={() => irAPagina(paginaActual - 1)}
          disabled={paginaActual === 1}
        >
          Anterior
        </button>

        {[...Array(totalPaginas)].map((_, i) => (
          <button
            key={i}
           className={`btn ${paginaActual === i + 1 ? "btn-primary" : "btn-outline-secondary"}`}
            onClick={() => irAPagina(i + 1)}
        >
         {i + 1}
          </button>





        ))}

        <button
          onClick={() => irAPagina(paginaActual + 1)}
          disabled={paginaActual === totalPaginas}
        >
          Siguiente
        </button>
      </div>




    </div>
  );
};

export default Libros;
