import express from "express";
import { register , login, googleLogin , logout } from "../controllers/authController.js";
import { getMe } from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

// router.post("/login", loginUser);
router.post("/register", register);
router.post("/login", login);
router.post("/google", googleLogin);
router.post("/logout", logout);
router.get("/me", authMiddleware, getMe);


export default router;