import { Link } from "react-router-dom";

const BookCard = ({ libro, onAddToCart, isClickable = false }) => {
  const imagenUrl =
    libro?.imagen ||
    libro?.portada ||
    "https://picsum.photos/300/450?random=1";

  // Contenido interno de la card
  const content = (
    <div className="card h-100 shadow-sm">
      <img
        src={imagenUrl}
        className="card-img-top"
        alt={libro?.titulo || "Portada"}
        style={{ objectFit: "cover", height: "300px" }}
        onError={(e) =>
          (e.currentTarget.src =
            "https://picsum.photos/300/450?random=2")
        }
      />

      <div className="card-body d-flex flex-column">
        {/* Título SIN link si la card es clickable */}
        {!isClickable ? (
          <Link to={`/libro/${libro.id}`} className="text-decoration-none">
            <h5 className="card-title">{libro?.titulo || "Sin título"}</h5>
          </Link>
        ) : (
          <h5 className="card-title">{libro?.titulo || "Sin título"}</h5>
        )}

        <p className="card-text">
          <strong>Autor:</strong> {libro?.autor || "Desconocido"}
        </p>

        {libro?.precio && (
          <p className="card-text">
            <strong>Precio:</strong> ${libro.precio}
          </p>
        )}

        {libro?.descripcion && (
          <p className="card-text" style={{ fontSize: "0.9rem" }}>
            {libro.descripcion}
          </p>
        )}

        {onAddToCart && (  <button    className="btn btn-primary mt-auto add-cart-btn"    onClick={() => onAddToCart(libro)}  >
              <i className="bi bi-cart3"></i>
                  <span>Agregar al carrito</span>  </button>)}
      </div>

    </div>
  );

  // Si es clickeable, envolver todo en Link
  return isClickable ? (
    <Link
      to={`/libro/${libro.id}`}
      className="text-decoration-none"
      style={{ color: "inherit" }}
    >
      {content}
    </Link>
  ) : (
    content
  );
};

export default BookCard;




