

import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";
import { FaUser, FaShoppingCart } from "react-icons/fa";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useContext(AuthContext);
  const { cart } = useContext(CartContext);

  const [open, setOpen] = useState(false);

  const totalItems = cart.reduce((acc, i) => acc + (i.cantidad || 1), 0);

  return (
    <nav className="nav">
      <div className="nav-left">
        <Link className="brand" to="/">Ci Librería</Link>
      </div>

      {/* BOTÓN HAMBURGUESA */}
      <button className="hamburger" onClick={() => setOpen(!open)}>
        <span className={`bar ${open ? "open" : ""}`}></span>
        <span className={`bar ${open ? "open" : ""}`}></span>
        <span className={`bar ${open ? "open" : ""}`}></span>
      </button>

      <div className={`nav-menu ${open ? "show" : ""}`}>
        <Link to="/libros" className="nav-link" onClick={() => setOpen(false)}>
          Libros
        </Link>

        {user?.role === "admin" && (
          <Link to="/admin/libros" className="nav-link" onClick={() => setOpen(false)}>
            Administrar
          </Link>
        )}

        <Link to="/carrito" className="nav-link" onClick={() => setOpen(false)}>
          <FaShoppingCart style={{ marginRight: "4px" }} />
            {totalItems > 0 && <span className="badge">{totalItems}</span>}
            </Link>

            {!isAuthenticated ? (
                <Link to="/login" className="nav-link" onClick={() => setOpen(false)}>
                      <FaUser style={{ marginRight: "4px" }} />                          Login                        
                          </Link>                            ) : (
                                <button    className="btn-link"    onClick={() => {      logout();      setOpen(false);    }}  >
                                      <FaUser style={{ marginRight: "4px" }} />
                                          Salir
                                            </button>
                                            )}
                                                  
      </div>
    </nav>
  );
};

export default Navbar;

