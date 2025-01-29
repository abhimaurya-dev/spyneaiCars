import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import YAML from "yamljs";
import path from "path";
import { fileURLToPath } from "url";
import { dirname, resolve } from "path";

import { mongodbConnect } from "./config/db.js";
import errorHandler from "./middlewares/errorMiddleware.js";
import authRoutes from "./routes/authRoutes.js";
import carRoutes from "./routes/carRoutes.js";
import carImageRoutes from "./routes/carImageRoutes.js";

const __dirname = dirname(fileURLToPath(import.meta.url));
const yamlFilePath = resolve(__dirname, "docs", "swagger.yaml");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json({ limit: "10mb" }));
const corsOptions = {
  origin: [
    "http://localhost:8000",
    "http://spyneai-cars-rkgr.vercel.app",
    "http://localhost:3000",
    "https://spyneai-cars.vercel.app",
  ],
  credentials: true,
  allowedHeaders: ["Content-type", "Accept", "Authorization"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

// Routes
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/carImage", carImageRoutes);
app.use("/api/v1/cars", carRoutes);

const swaggerUICss =
  "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/4.3.0/swagger-ui.min.css";
const swaggerOptions = {
  customCss:
    ".swagger-ui .opblock .opblock-summary-path-description-wrapper { align-items: center; display: flex; flex-wrap: wrap; gap: 0 10px; padding: 0 10px; width: 100%; }",
  customCssUrl: swaggerUICss,
};

const swaggerDocument = YAML.load(yamlFilePath);
app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(swaggerDocument, swaggerOptions)
);

// Error Handling middleware
app.use(errorHandler);
app.listen(PORT, () => {
  mongodbConnect();
  console.log(`Server is listening on port: ${PORT}`);
});
