import { Router } from "express";
import AuthController from "../controllers/authControllers.js";
import authMiddleware from "../middlewares/authenticates.js";
import profileController from "../controllers/profileControllers.js";
import NewsController from "../controllers/newsControllers.js";
import redisCache from "../DB/redis.config.js";

const router = Router();

router.post("/auth/register", AuthController.register);
router.post("/auth/login", AuthController.login);
router.get("/send-email", AuthController.sendMail);

//Profile routes
router.get("/profile", authMiddleware, profileController.index); //Private route
router.put("/profile/:id", authMiddleware, profileController.update);

//News routes
router.get("/news", redisCache.route(), NewsController.index);
router.post("/news", authMiddleware, NewsController.store);
router.get("/news/:id", NewsController.show);
router.put("/news/:id", authMiddleware, NewsController.update);
router.delete("/news/:id", authMiddleware, NewsController.destroy);

export default router;
