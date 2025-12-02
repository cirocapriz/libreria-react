import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const result = register(email, password);

    if (result.success) {
      setSuccess("Registro exitoso. Ahora podés iniciar sesión.");
      setError("");
      setEmail("");
      setPassword("");
      setTimeout(() => navigate("/login"), 1500);
    } else {
      setError(result.message);
      setSuccess("");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Registrarse</h2>

      {error && <p style={{ color: "red" }}>{error}</p>}
      {success && <p style={{ color: "green" }}>{success}</p>}

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
            minLength={4}
          />
        </div>

        <button type="submit" style={{ marginTop: "10px" }}>
          Registrarse
        </button>
      </form>
    </div>
  );
};

export default Register;
