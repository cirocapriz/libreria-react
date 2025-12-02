import { useEffect, useState } from "react";

export default function Libros() {
  const [libros, setLibros] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros")
      .then(res => res.json())
      .then(data => setLibros(data))
      .catch(err => setError("Error al cargar los libros"));
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Libros</h2>
      <ul>
        {libros.map(libro => (
          <li key={libro.id}>
            {libro.titulo} — {libro.autor}
          </li>
        ))}
      </ul>
    </div>
  );
}
