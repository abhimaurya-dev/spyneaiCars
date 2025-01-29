import express from "express";
import { uploadProductImageController } from "../controllers/productImageControllers/uploadProductImageController.js";

const router = express.Router();

router.post("/upload", uploadProductImageController);

export default router;
