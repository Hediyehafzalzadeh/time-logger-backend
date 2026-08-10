import express from "express";
import { register } from "../controllers/authController.js";

const router = express.Router();

// router.post("/login", loginUser);
router.post("/register", register);

export default router;