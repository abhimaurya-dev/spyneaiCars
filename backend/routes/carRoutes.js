import express from "express";
import { isAuthenticated } from "../middlewares/authMiddleware.js";

import { getAllProductController } from "../controllers/productControllers/getAllProductsController.js";
import { getUserProductsController } from "../controllers/productControllers/getUserProductsController.js";
import { createProductController } from "../controllers/productControllers/createProductController.js";
import { updateProductController } from "../controllers/productControllers/updateProductController.js";
import { deleteProductController } from "../controllers/productControllers/deleteProductController.js";

const router = express.Router();

router.get("/getAllCars", getAllProductController);
router.get("/getUserCars", isAuthenticated, getUserProductsController);
router.post("/createCars", isAuthenticated, createProductController);
router.put("/update/:id", isAuthenticated, updateProductController);
router.delete("/delete/:id", isAuthenticated, deleteProductController);

export default router;
