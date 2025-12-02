/*
// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {email, role}

  // Cargar usuario almacenado al iniciar
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Guardar usuario cuando se modifica
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);


  // --------------------------------------
  // LOGIN
  // --------------------------------------
  const login = (email, password) => {
    // Admin hardcodeado
    if (email === "admin@admin.com" && password === "admin") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      return { success: true };
    }

    // Usuarios registrados en localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser({ email: found.email, role: "user" });
      return { success: true };
    }

    return { success: false, message: "Credenciales incorrectas" };
  };


  // --------------------------------------
  // REGISTRO
  // --------------------------------------
  const register = (email, password) => {
    if (!email.includes("@")) {
      return { success: false, message: "Email inválido" };
    }

    if (password.length < 4) {
      return { success: false, message: "La contraseña es muy corta" };
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    // Evitar duplicados
    if (users.some((u) => u.email === email)) {
      return { success: false, message: "El usuario ya existe" };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };


  // --------------------------------------
  // LOGOUT
  // --------------------------------------
  const logout = () => {
    setUser(null);
  };


  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);

*/

// src/context/AuthContext.jsx
import { createContext, useState, useEffect, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null); // {email, role}

  // Cargar usuario almacenado al iniciar
  useEffect(() => {
    const savedUser = JSON.parse(localStorage.getItem("user"));
    if (savedUser) setUser(savedUser);
  }, []);

  // Guardar usuario cuando se modifica
  useEffect(() => {
    if (user) {
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  // Determinar si hay sesión activa
  const isAuthenticated = user !== null;

  // --------------------------------------
  // LOGIN
  // --------------------------------------
  const login = (email, password) => {
    // Admin hardcodeado
    if (email === "admin@admin.com" && password === "admin") {
      const adminUser = { email, role: "admin" };
      setUser(adminUser);
      return { success: true };
    }

    // Usuarios registrados en localStorage
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const found = users.find(
      (u) => u.email === email && u.password === password
    );

    if (found) {
      setUser({ email: found.email, role: "user" });
      return { success: true };
    }

    return { success: false, message: "Credenciales incorrectas" };
  };

  // --------------------------------------
  // REGISTRO
  // --------------------------------------
  const register = (email, password) => {
    if (!email.includes("@")) {
      return { success: false, message: "Email inválido" };
    }

    if (password.length < 4) {
      return { success: false, message: "La contraseña es muy corta" };
    }

    const users = JSON.parse(localStorage.getItem("users")) || [];

    if (users.some((u) => u.email === email)) {
      return { success: false, message: "El usuario ya existe" };
    }

    const newUser = { email, password };
    users.push(newUser);
    localStorage.setItem("users", JSON.stringify(users));

    return { success: true };
  };

  // --------------------------------------
  // LOGOUT
  // --------------------------------------
  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        login,
        logout,
        register,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Hook para usar el contexto fácilmente
export const useAuth = () => useContext(AuthContext);
