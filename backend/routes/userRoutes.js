import express from "express";
import {
  login,
  logout,
  register,
  updateProfile,
} from "../controllers/userController.js";
import authUser from "../middleware/authUser.js";
import { singleUpload } from "../middleware/multer.js";
const router = express.Router();

router.post("/register", singleUpload, register);
router.post("/login", login);
// router.get("/logout", logout);
router.post("/profile/update", authUser, updateProfile);

export default router;
