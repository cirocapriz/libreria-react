# 📚 Proyecto Final – Librería en React

Este proyecto forma parte del curso de Desarrollo Web con React (Talento Tech).  
Consiste en una librería online que permite ver productos, registrarse, iniciar sesión, usar un carrito y, en caso de ser administrador, acceder a un CRUD de libros conectado a MockAPI.

---

## 🚀 Tecnologías utilizadas
- React + Vite  
- React Router DOM  
- Context API (Auth y Carrito)  
- MockAPI  
- Bootstrap / CSS propio  
- Fetch para consumo de API

---

## ▶️ Cómo ejecutar el proyecto

1. Descargar o clonar el repositorio:
   ```bash
   git clone <URL_DEL_REPO>
2. Instalar dependencias:

npm install


3. Ejecutar en modo desarrollo:

npm run dev


4. Abrir en el navegador:

http://localhost:5173

##🔐 Registro, Login y Acceso de Administrador

El sistema permite registrarse e iniciar sesión como usuario común.
Para acceder al panel de administración (CRUD de libros) se debe ingresar con:

Correo: admin@admin.com

Contraseña: admin

⚠️ Nota importante: en un navegador nuevo, estos datos deben registrarse una primera vez desde la pantalla de “Registro”. Luego pueden usarse normalmente para iniciar sesión.

##🧩 Funcionalidades

Ver listado de libros

Agregar y quitar del carrito

Vaciar carrito

Registro e inicio de sesión

Protección de rutas (Admin solo si está logueado como admin)

CRUD de libros (Crear, Editar, Eliminar)

Consumo de API mediante MockAPI

##📂 Estructura del proyecto

/src/pages → Home, Login, Registro, Admin, etc.

/src/components → Navbar, BookCard, formularios, etc.

/src/context → AuthContext y CartContext

/src/services → funciones para conectar a MockAPI

##👤 Autor

Capriz, Ciro Augusto Natanael
Curso Talento Tech – Año 2025