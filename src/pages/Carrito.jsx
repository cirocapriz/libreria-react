import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "./Carrito.css";

const Carrito = () => {
  const { cart, increase, decrease, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleFinalizar = () => {
    clearCart();
    navigate("/gracias");
  };

  return (
    <div className="carrito-container">
      

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          <div className="carrito-grid">
            {cart.map((item) => (
              <div key={item.id} className="carrito-card">
                {/* Imagen del producto */}
                <div className="carrito-img">
                  <img
                    src={item.portada || item.imagen || "https://via.placeholder.com/150"}
                    alt={item.titulo}
                  />
                </div>

                {/* Detalles */}
                <div className="carrito-info">
                  <h3>{item.titulo}</h3>
                  <p className="autor">{item.autor}</p>
                  <p>Precio unitario: ${item.precio}</p>
                  <p>Cantidad: {item.cantidad}</p>

                  <div className="carrito-actions">
                    <button onClick={() => decrease(item.id)}>-</button>
                    <button onClick={() => increase(item.id)}>+</button>
                    <button
                      className="btn-danger"
                      onClick={() => removeFromCart(item.id)}
                    >
                      Eliminar
                    </button>
                  </div>

                  <p className="subtotal">
                    Subtotal: ${(Number(item.precio) || 0) * item.cantidad}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="carrito-resumen">
            <div className="carrito-total">Total: ${total}</div>
            <button className="finalizar-btn" onClick={handleFinalizar}>
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;