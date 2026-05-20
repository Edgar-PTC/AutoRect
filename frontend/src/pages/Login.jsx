import { Link, useNavigate } from "react-router-dom"; // Importación de hooks y componentes necesarios para la funcionalidad de inicio de sesión y navegación
import { useState } from "react"; // Importación de useState para manejar el estado local del formulario de inicio de sesión
import LiquidEther from '../components/ReactBits/BGLiquidEther.jsx'
import { useAuth } from "../hooks/useAuth.js"; // Importación de hook personalizado para manejar la autenticación del usuario

function LogIn() {
  const navigate = useNavigate(); // Hook para manejar la navegación programática
  const { login, loading } = useAuth(); // Hook personalizado para manejar la autenticación del usuario
  const [email, setEmail] = useState(""); // Estado local para almacenar el correo electrónico ingresado por el usuario
  const [password, setPassword] = useState(""); // Estado local para almacenar la contraseña ingresada por el usuario
  const [incorrect, setIncorrect] = useState(false); // Estado local para manejar la visualización de un mensaje de error en caso de credenciales incorrectas
  const [message, setMessage] = useState(""); // Estado local para almacenar el mensaje de error a mostrar en caso de credenciales incorrectas

  // Función para manejar el envío del formulario de inicio de sesión
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!email.trim() || !password.trim()) { // Validación básica para asegurarse de que el correo electrónico y la contraseña no estén vacíos
      setIncorrect(true); // Si alguno de los campos está vacío, se actualiza el estado para mostrar un mensaje de error
      setMessage("Por favor, ingresa tu correo electrónico y contraseña."); // Se establece un mensaje de error específico para campos vacíos
      return;
    }

    const ok = await login(email, password); // Llamada a la función de inicio de sesión del hook de autenticación
    if(!ok){
      setIncorrect(true); // Si las credenciales son incorrectas, se actualiza el estado para mostrar un mensaje de error
      setMessage("Correo electrónico o contraseña incorrectos."); // Se establece un mensaje de error específico para credenciales incorrectas
    }
  };

  return (
    <div className="relative min-h-screen w-full">
      <LiquidEther className="absolute inset-0 bg-black flex flex-row min-w-screen min-h-screen justify-center items-center" style={{ position: 'absolute', top: 0, left: 0, zIndex: 0 }} />

      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center p-10">
        <div className="border-2 gap-4 flex border-red-700 z-20 h-96 w-196 rounded-3xl bg-gray-700/80 p-10 backdrop-blur-sm justify-between items-center" style={{display: 'grid', gridTemplateColumns: "1fr 3fr"}}>
          <img src="https://res.cloudinary.com/dvtk6ky3t/image/upload/v1778685839/React-icon.svg_thczqe.png" alt="" />
          <form className="flex flex-col gap-3" onSubmit={handleSubmit}>
            <h1 className="text-center text-3xl text-red-900 font-bold">INICIO DE SESIÓN</h1>
            <div className="flex flex-col gap-2 px-3 py-0 items-start ">
              <label className="text-white" htmlFor="">Correo electrónico</label>
              <input
                id="login-email"
                type="email"
                autoComplete="off"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                placeholder="correo@ejemplo.com"
                className="w-full py-2 px-4 bg-white/70 rounded-2xl border-2 border-red-950" />
            </div>
            <div className="flex flex-col gap-2 px-3 py-0 items-start ">
              <label className="text-white" htmlFor="">Contraseña</label>
              <input
                id="login-password"
                type="password"
                autoComplete="off"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="••••••••"
                className="w-full py-2 px-4 bg-white/70 rounded-2xl border-2 border-red-950" />
            </div>
            <div className="flex justify-center items-center py-5" >
              <button
                type="submit"
                variant="outline"
                disabled={loading}
                className="text-white py-3 px-7 w-4/5 hover:bg-red-600 bg-red-700 rounded-2xl">
                {loading ? "Ingresando..." : "Iniciar sesión"}
              </button>
            </div>
          </form>
        </div>
      </div>
      <div className="fixed z-100 top-0 left-0"></div>
    </div>
  );
}

export default LogIn;