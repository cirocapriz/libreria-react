import { useEffect, useState } from "react";
import BookCard from "../components/BookCard";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";

import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import styles from "./Home.module.css"; // <- CSS Module
import { Link } from "react-router-dom";


const Home = () => {
  const [libros, setLibros] = useState([]);
  const [frase, setFrase] = useState("");

  const frases = [
    "El que lee mucho y anda mucho, ve mucho y sabe mucho. — Cervantes",
    "Una casa sin libros es como un cuerpo sin alma. — Cicerón",
    "No hay dos personas que lean el mismo libro. — Edmund Wilson",
    "Leer es soñar con los ojos abiertos.",
    "Los libros son espejos: solo se ve en ellos lo que uno ya lleva dentro. — Carlos Ruiz Zafón",
    "Las bibliotecas son los tesoros del espíritu humano.",
    "Una biblioteca no es un lujo, sino una de las necesidades de la vida. — Henry Ward Beecher"
  ];

  useEffect(() => {
    fetch("https://691933409ccba073ee925ebf.mockapi.io/api/v1/libros")
      .then(res => res.json())
      .then(data => {
        const mezclados = data.sort(() => Math.random() - 0.5);
        setLibros(mezclados);
      })
      .catch(err => console.log("Error:", err));
  }, []);

  useEffect(() => {
    const cambiarFrase = () => {
      const random = frases[Math.floor(Math.random() * frases.length)];
      setFrase(random);
    };
    cambiarFrase();
    const intervalo = setInterval(cambiarFrase, 10000);
    return () => clearInterval(intervalo);
  }, []);

  const placeholder = "https://via.placeholder.com/1200x400?text=Sin+imagen";
  const destacados = libros.slice(0, 5);
  const recomendados = libros.slice(5, 9);
  const navigate = useNavigate();


  return (
    <div>
      {/* HERO */}
      <div className={styles.hero}>
          <div className={styles.overlay}></div>
            <div className={styles.heroContent}>
                  <h4>¡Bienvenido a la librería!</h4>
                      <h2>Libros clásicos y modernos</h2>
                          <h1>Grandes descuentos</h1>
                              <p>¡Tu próximo libro favorito a un click de distancia!</p>
                                  <button onClick={() => navigate("/libros")}>Explorar</button>
                                    </div>
                                    </div>
      {/* FRASE ALEATORIA */}
      <div className={styles.fraseContainer}>
        <p>{frase}</p>
      </div>

      {/* DESTACADOS */}
      <div className="container mt-5">
        <h2 className="mb-4">Destacados</h2>
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          navigation
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          loop={true}
          spaceBetween={20}
          breakpoints={{
            0: { slidesPerView: 1 },
            576: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            992: { slidesPerView: 4 }
          }}
        >
          {destacados.map(libro => (
            <SwiperSlide key={libro.id}>
              <div style={{ textAlign: "center", padding: "1rem" }}>
                <img
                  src={libro.imagen || libro.portada || placeholder}
                  alt={libro.titulo}
                  style={{
                    maxWidth: "100%",
                    height: 240,
                    objectFit: "contain",
                    margin: "0 auto"
                  }}
                />
                <h6 className="mt-2">{libro.titulo}</h6>
                <small className="text-muted">{libro.autor}</small>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* RECOMENDADOS */}
      <div className="container mt-5">
        <h2 className="mb-4">Recomendados</h2>
        <div className="row g-4">
          {recomendados.map(libro => (

            <div  key={libro.id}
              className={`col-12 col-sm-6 col-md-4 col-lg-3 ${styles.recomendadoLink}`}>
                  <div className={styles.recomendadoCard}>
                        <BookCard libro={libro} isClickable={true} />
                          </div>
                          </div>
            
          ))}
        </div>
      </div>

      


      {/* OPINIONES */}
<div className="container mt-5">
  <h2 className="mb-4">Lectores dicen</h2>

  <Swiper
    modules={[Pagination, Autoplay]}
    pagination={{ clickable: true }}
    autoplay={{ delay: 4000 }}
    loop={true}
  >
    {[
      {
        texto: "Excelente atención y variedad de libros.",
        nombre: "Ana J.",
        foto: "https://randomuser.me/api/portraits/women/65.jpg"
      },
      {
        texto: "Los descuentos son geniales.",
        nombre: "Juan W.",
        foto: "https://randomuser.me/api/portraits/men/32.jpg"
      },
      {
        texto: "Siempre encuentro lo que busco.",
        nombre: "María S.",
        foto: "https://randomuser.me/api/portraits/women/44.jpg"
      }
    ].map((op, index) => (
      <SwiperSlide key={index}>
        <div className="d-flex justify-content-center">
          <div className="card bg-dark bg-opacity-50 text-light p-4 shadow-lg rounded w-75">
            <div className="d-flex align-items-center mb-3">
              <img
                src={op.foto}
                alt={op.nombre}
                className="rounded-circle me-3"
                width="60"
                height="60"
                style={{ objectFit: "cover" }}
              />
              <h5 className="m-0">{op.nombre}</h5>
            </div>

            <p className="fs-5 fst-italic">"{op.texto}"</p>

            <div className="text-warning">
              ★★★★★
            </div>
          </div>
        </div>
      </SwiperSlide>
    ))}
  </Swiper>
</div>


      {/* VIDEO */}
      <section className="video mt-5">
        <h2 style={{ textAlign: "center", marginBottom: "20px" }}>📺</h2>
        <div style={{ display: "flex", justifyContent: "center" }}>
          <iframe
            width="560"
            height="315"
            src="https://www.youtube.com/embed/YLYJ565u0wE"
            title="Video de ejemplo"
            frameBorder="0"
            allowFullScreen
          ></iframe>
        </div>
      </section>

    </div>
  );
};

export default Home;