import { useState } from "react";
import { FaEnvelope } from "react-icons/fa";
import "./Contacto.css";

const Contacto = () => {
  const [enviado, setEnviado] = useState(false);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setCargando(true);
    setError(false);

    const data = new FormData(e.target);

    try {
      const res = await fetch("https://formspree.io/f/xldneeak", {
        method: "POST",
        body: data,
        headers: { Accept: "application/json" },
      });

      if (res.ok) {
        setEnviado(true);
        e.target.reset();
      } else {
        setError(true);
      }
    } catch (err) {
      setError(true);
    } finally {
      setCargando(false);
    }
  };

  return (
    <div className="contacto-container">
      <div className="contacto-card">
        <div className="contacto-header">
          <FaEnvelope className="text-blue-600 text-5xl mx-auto mb-2" />
          <h2>Contacto</h2>
          <p>¿Tenés alguna consulta o sugerencia? Escribime acá.</p>
        </div>

        {enviado && (
          <div className="contacto-success">
            ¡Tu mensaje fue enviado correctamente! 🙌
          </div>
        )}

        {error && (
          <div className="contacto-error">
            Ocurrió un error al enviar el mensaje. Probá nuevamente.
          </div>
        )}

        <form onSubmit={handleSubmit} className="contacto-form">
          <div>
            <label>Nombre: </label>
            <input name="nombre" required placeholder="Tu nombre" />
          </div>

          <div>
            <label>Email: </label>
            <input name="email" type="email" required placeholder="tuemail@email.com" />
          </div>

          <div>
            <label>Mensaje: </label>
            <textarea name="mensaje" required placeholder="Escribí tu mensaje..." />
          </div>

          <button type="submit" disabled={cargando}>
            {cargando ? "Enviando..." : "Enviar mensaje"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Contacto;