import e from "express"
import cookieParser from "cookie-parser"
import cors from "cors"
import limiter from "./src/middlewares/rateLimit.js"
//Importar las routes
import Assignatures from "./src/routes/assignatureRoutes.js"
import homeworkCategories from "./src/routes/homeworkCategoriesRoutes.js"
import homeworks from "./src/routes/homeworkRoutes.js"
import loginStudents from "./src/routes/logInStudentsRoutes.js"
import loginTeachers from "./src/routes/logInTeachersRoutes.js"
import logOut from "./src/routes/logOutRoutes.js"
import recoveryPasswordStudents from "./src/routes/recoveryPasswordStudentsRoutes.js"
import recoveryPasswordTeachers from "./src/routes/recoveryPasswordTeachersRoutes.js"
import registerStudents from "./src/routes/registerStudentsRoutes.js"
import registerTeachers from "./src/routes/registerTeachersRoutes.js"
import students from "./src/routes/studentsRoutes.js"
import teachers from "./src/routes/teachersRoutes.js"

const app = e();

app.use(limiter);

app.use(cors ({
    origin: "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
	allowedHeaders: ["Content-Type", "Authorization"],
}));

app.use(cookieParser());

app.use(e.json());

//Crear los endpoints
app.use("/api/assignatures", Assignatures);
app.use("/api/categories", homeworkCategories);
app.use("/api/homeworks", homeworks);
app.use("/api/loginStudents", loginStudents);
app.use("/api/loginTeachers",loginTeachers);
app.use("/api/logOut", logOut);
app.use("/api/recoverypasswordStudent", recoveryPasswordStudents);
app.use("/api/recoverypasswordTeacher", recoveryPasswordTeachers);
app.use("/api/registerStudents", registerStudents);
app.use("/api/registerTeachers", registerTeachers);
app.use("/api/students", students);
app.use("/api/teachers", teachers);

export default app;