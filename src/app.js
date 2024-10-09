import express from "express";
import morgan from "morgan";
import { engine } from "express-handlebars";
import path from "path";
import { fileURLToPath } from "url"; // Necesario para trabajar con import.meta.url

// Importar rutas
import userRoutes from "./routes/Users.js";
import roleRoutes from "./routes/Roles.js";
import locationRoutes from "./routes/Locations.js";
import registrationRoutes from "./routes/Registrations.js";
import coachSportRoutes from "./routes/CoachSports.js";
import fieldRoutes from "./routes/Fields.js";
import scheduleRoutes from "./routes/Schedules.js";
import trainingRoutes from "./routes/Trainings.js";
import dateRoutes from "./routes/Dates.js";
import sportRoutes from "./routes/Sports.js";
import attendanceRoutes from "./routes/Attendance.js";

// Obtener __dirname equivalente en ES module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Configuración de Handlebars
app.engine(
  "hbs",
  engine({
    extname: ".hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views", "layouts"),
    runtimeOptions: {
      allowProtoPropertiesByDefault: true,
      allowProtoMethodsByDefault: true,
    },
    helpers: {
      eq: (a, b) => a === b, // Helper para comparar dos valores
      formatDate: (date) => {
        const d = new Date(date);
        return d.toISOString().split("T")[0]; // Retorna en formato YYYY-MM-DD
      },
    },
  })
);

app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middlewares
app.use(morgan("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Asegúrate de tener esto

// Rutas
app.use("/api/users", userRoutes);
app.use("/api/roles", roleRoutes);
app.use("/api/locations", locationRoutes);
app.use("/api/registrations", registrationRoutes);
app.use("/api/coaches", coachSportRoutes);
app.use("/api/fields", fieldRoutes);
app.use("/api/schedules", scheduleRoutes);
app.use("/api/trainings", trainingRoutes);
app.use("/api/dates", dateRoutes);
app.use("/api/sports", sportRoutes);
app.use("/api/attendances", attendanceRoutes);

export default app;
