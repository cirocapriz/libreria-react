import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";



const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    const result = login(email, password);

    if (result.success) {
      navigate("/"); // redirige al inicio
    } else {
      setError(result.message || "Error al iniciar sesión");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Iniciar Sesión</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label><br />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Ingresar
        </button>
      </form>

      <p style={{ marginTop: "1rem" }}>
        ¿No tenés cuenta?{" "}
        <Link to="/registro">Registrate acá</Link>
      </p>
    </div>
  );
};

export default Login;
