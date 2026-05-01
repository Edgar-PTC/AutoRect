import e from "express";
//Importamos todas las rutas
import logInRoute from "./src/routes/logInRoute.js"
import logOutRoute from "./src/routes/logOutRoute.js"
import productsRoute from "./src/routes/productsRoute.js"
import recoveryPasswordRoute from "./src/routes/recoveryPasswordRoute.js"
import registerUserRoute from "./src/routes/registerUserRoute.js"
import usersRoute from "./src/routes/usersRoute.js"

//Importamos el cors y el cookieparser bro
import cookieParser from "cookie-parser";
import cors from "cors"

const allowedOrigins = [ // Seagregan orígenes permitidos para CORS, incluyendo la URL del frontend desde variables de entorno o un valor por defecto
	process.env.FRONTEND_URL,
	"http://localhost:5173",
].filter(Boolean);

app.use( // Configuración de CORS para permitir solicitudes desde el frontend y manejar credenciales
	cors({
		origin: (origin, callback) => {
			if (!origin || allowedOrigins.includes(origin)) {
				callback(null, true);
				return;
			}

			callback(new Error("Origen no permitido por CORS"));
		},
		credentials: true,
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		allowedHeaders: ["Content-Type", "Authorization"],
	}),
);

//Para que tenga en cuentas las cookies mmh Cookies q rico
app.use(cookieParser());

//Aqui le decimos: hey, imbecil, tambien acepta a mi pana el Postman
app.use(e.json());

//Definimos los endpoints
app.use("/api/logIn", logInRoute);
app.use("/api/logOut", logOutRoute);
app.use("/api/products", productsRoute);
app.use("/api/recoveryPassword", recoveryPasswordRoute);
app.use("/api/register", registerUserRoute);
app.use("/api/users", usersRoute);

//Y exportamos el app para usarlo por todos lados
export default app;