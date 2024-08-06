import { Router } from "express";
import AuthController from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authenticates.js";
import profileController from "../controllers/profileControllers.js";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);

//Profile routes
router.get("/profile", authMiddleware, profileController.index); //Private route
router.put("/profile/:id", authMiddleware, profileController.update);

export default router;
