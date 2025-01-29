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
import mongoose from "mongoose";

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
    "https://spyneai-cars-abhishek-mauryas-projects-6a943e29.vercel.app",
    "https://spyneai-cars-git-main-abhishek-mauryas-projects-6a943e29.vercel.app/auth/login",
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

const swaggerDocument = YAML.load(yamlFilePath);
app.use("/dev-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.get("/docs", (req, res) => {
  const postmanDocsUrl =
    "https://documenter.getpostman.com/view/20868478/2sAYX2LiBd";
  res.redirect(postmanDocsUrl);
});

// Error Handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack); // Logs the error stack trace
  res.status(500).json({ message: err.message });
});
// app.use(errorHandler);
app.listen(PORT, () => {
  mongodbConnect();
  console.log(`Server is listening on port: ${PORT}`);
});
