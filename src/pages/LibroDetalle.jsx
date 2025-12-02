import { useParams } from "react-router-dom";
import { useEffect, useState, useContext } from "react";
import { CartContext } from "../context/CartContext";
import { ShoppingCart } from "lucide-react";


const LibroDetalle = () => {
  const { id } = useParams();
  const [libro, setLibro] = useState(null);
  const [error, setError] = useState(null);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    setLibro(null);
    setError(null);
    fetch(`https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("No se pudo obtener el libro");
        return res.json();
      })
      .then(data => setLibro(data))
      .catch(err => setError(err.message));
  }, [id]);

  if (error) return <div>Error: {error}</div>;
  if (!libro) return <h2>Cargando...</h2>;

  const imagenUrl = libro?.imagen || libro?.portada || "https://picsum.photos/300/450?random=3";

  return (
    <div style={{ padding: "20px" }}>
      <h2>{libro.titulo}</h2>

      <img src={imagenUrl} alt={libro.titulo} style={{ width: "300px", borderRadius: "8px" }}
           onError={(e) => { e.currentTarget.src = "https://picsum.photos/300/450?random=4"; }} />

      <p><strong>Autor:</strong> {libro.autor}</p>

      {libro.descripcion && <p style={{ maxWidth: "500px" }}>{libro.descripcion}</p>}

      <button  onClick={() => addToCart(libro)}
        style={{
              marginTop: "20px",
                  background: "#0b74b8",
                      color: "white",
                          border: "none",
                              padding: "10px 16px",
                                  borderRadius: "8px",
                                      display: "flex",
                                          alignItems: "center",
                                              gap: "8px",
                                                  cursor: "pointer",
                                                      fontSize: "16px",
                                                          transition: "transform 0.15s ease, background 0.2s ease"
                }}
                  onMouseEnter={(e) => (e.currentTarget.style.background = "#095f96")}
                    onMouseLeave={(e) => (e.currentTarget.style.background = "#0b74b8")}
                      onMouseDown={(e) => (e.currentTarget.style.transform = "scale(0.95)")}
                        onMouseUp={(e) => (e.currentTarget.style.transform = "scale(1)")}
                        >
                            <ShoppingCart size={18} />
                              Agregar 
                              </button>
                                  </div>
                                    );
                                    };

export default LibroDetalle;

