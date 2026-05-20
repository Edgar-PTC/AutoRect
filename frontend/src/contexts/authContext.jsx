import React, { createContext, useState, useEffect, useCallback } from "react"; //Importamos todas las mierdas de React, BIEN
import { useNavigate } from "react-router"; //Importamos las cosas de React Router para que, si las credenciales son correctas, redirija.
import { toast } from "sonner";

const AuthContext = createContext(null);
export { AuthContext };

// Leer desde variables de entorno
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:4000/api";
const STORAGE_KEY = import.meta.env.VITE_AUTH_STORAGE_KEY || "authToken";

const decodeJwtPayload = (token) => {
  if (!token) return null;
  try {
    const base64Url = token.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const jsonPayload = decodeURIComponent(atob(base64).split('').map(c => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const getToken = useCallback(() => localStorage.getItem(STORAGE_KEY), []);
  const setToken = useCallback((token) => {
    localStorage.setItem(STORAGE_KEY, token);
  }, []);
  const clearToken = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY);
    sessionStorage.removeItem(STORAGE_KEY);
  }, []);

  const logout = useCallback(async () => {
    try {
        await fetch(`${API_URL}/logOut`, {
            method: "POST",
            credentials: "include",
        });
    } catch (error) {
      console.error("Logout API error:", error);
    }
  }, [navigate]);

  const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/loginStudents`, {  // Ajusta la ruta según tu backend
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ "email": email, "password": password }),
        credentials: "include",
      });
      const data = await response.json().catch(() => ({}));
      if (!response.ok) {
        toast.error(data.message || "Error de credenciales");
        return false;
      }

      toast.success("Bienvenido");
      navigate("/home");
      return true;
    } catch (error) {
      console.error(error);
      toast.error("Error de conexión");
      return false;
    }
  };

  useEffect(() => {
    const token = getToken();
    if (!token) {
      setLoading(false);
      return;
    }
    const payload = decodeJwtPayload(token);
    const isExpired = payload?.exp && payload.exp * 1000 < Date.now();
    if (isExpired) {
      clearToken();
      setLoading(false);
      return;
    }
    // Opcional: verificar token con backend
    fetch(`${API_URL}/verify`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then(res => {
        if (res.ok) {
          setUser(payload ? { id: payload.id, userType: payload.userType } : null);
        } else {
          clearToken();
        }
      })
      .catch(() => clearToken())
      .finally(() => setLoading(false));
  }, [getToken, clearToken]);

  return (
    <AuthContext.Provider value={{ user, login, logout, loading, API_URL }}>
      {children}
    </AuthContext.Provider>
  );
};