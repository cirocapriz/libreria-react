

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";

import ProtectedRoute from "./routes/ProtectedRoute";

import Home from "./pages/Home";
import Libros from "./pages/Libros";
import Carrito from "./pages/Carrito";
import Login from "./pages/Login";
import Navbar from "./components/Navbar";
import LibroDetalle from "./pages/LibroDetalle";
import AdminLibros from "./pages/AdminLibros";
import NuevoLibro from "./pages/NuevoLibro";
import EditarLibro from "./pages/EditarLibro";
import Register from "./pages/Register";
import Gracias from "./pages/Gracias";







function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Navbar />

          <Routes>
            <Route path="/registro" element={<Register />} />

            <Route path="/admin/libros" element={<ProtectedRoute requireAdmin={true}><AdminLibros /></ProtectedRoute>}/>

            <Route path="/" element={<Home />} />
            <Route path="/gracias" element={<Gracias />} />


            
            <Route path="/admin/libros/editar/:id" element={<ProtectedRoute requireAdmin={true}><EditarLibro /></ProtectedRoute>}/>

            
            <Route path="/admin/libros/nuevo" element={<ProtectedRoute requireAdmin={true}><NuevoLibro /></ProtectedRoute>}/>

            <Route path="/libros" element={<Libros />} />
            <Route
              path="/carrito"
              element={
                <ProtectedRoute>
                  <Carrito />
                </ProtectedRoute>
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/libro/:id" element={<LibroDetalle />} />

          </Routes>
          
          <footer className="bg-dark text-white text-center py-3 mt-4">
             <p className="mb-0">© 2025 React Libros </p>
             <p>📧 cirocapriz@gmail.com | 📞 +54 11 51658312</p>

          </footer>

        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;

