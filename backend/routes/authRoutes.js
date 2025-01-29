import express from "express";
import loginController from "../controllers/authControllers/loginController.js";
import registerController from "../controllers/authControllers/registerController.js";

const router = express.Router();

router.post("/login", loginController);
router.post("/register", registerController);

export default router;
