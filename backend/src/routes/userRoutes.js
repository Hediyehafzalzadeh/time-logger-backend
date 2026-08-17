import express from "express";

import {
  createUser,
  getUsers,
  getUser,
  getUsersCategories,
  updateUser,
  deleteUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/", createUser);
router.get("/", getUsers);
router.get("/:id", getUser);
router.get("/:id/categories", getUsersCategories);
router.patch("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;

