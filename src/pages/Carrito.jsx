// src/pages/Carrito.jsx
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

const Carrito = () => {
  const { cart, increase, decrease, removeFromCart, clearCart, total } = useCart();
  const navigate = useNavigate();

  const handleFinalizar = () => {
    // Podés agregar validaciones: exigir login, etc.
    clearCart();
    navigate("/gracias");
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Carrito</h2>

      {cart.length === 0 ? (
        <p>El carrito está vacío.</p>
      ) : (
        <>
          {cart.map((item) => (
            <div key={item.id} style={{ marginBottom: "20px", borderBottom: "1px solid #ddd", paddingBottom: "10px" }}>
              <h3>{item.titulo}</h3>
              <p>Precio unitario: ${item.precio}</p>
              <p>Cantidad: {item.cantidad}</p>

              <div>
                <button onClick={() => decrease(item.id)}>-</button>
                <button onClick={() => increase(item.id)} style={{ marginLeft: "6px" }}>+</button>

                <button
                  onClick={() => removeFromCart(item.id)}
                  style={{ marginLeft: "12px", color: "red" }}
                >
                  Eliminar
                </button>
              </div>

              <p style={{ marginTop: "8px" }}>
                Subtotal: ${ (Number(item.precio) || 0) * item.cantidad }
              </p>
            </div>
          ))}

          <h3>Total: ${total}</h3>

          <div style={{ marginTop: "20px" }}>
            <button
              onClick={handleFinalizar}
              style={{
                padding: "10px 16px",
                background: "green",
                color: "white",
                border: "none",
                borderRadius: "6px",
                cursor: "pointer"
              }}
            >
              Finalizar compra
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Carrito;
