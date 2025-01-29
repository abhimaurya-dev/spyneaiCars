import express from "express";
import { uploadProductImageController } from "../controllers/productImageControllers/uploadProductImageController.js";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload", isAuthenticated, uploadProductImageController);

export default router;
