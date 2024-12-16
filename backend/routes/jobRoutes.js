import express from "express";
import {
  getAdminJobs,
  getAllJobs,
  getJobById,
  jobRegister,
} from "../controllers/jobControlller.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", authUser, jobRegister);
router.get("/getalljobs", authUser, getAllJobs);
router.get("/getadminjobs", authUser, getAdminJobs);
router.get("/:id", authUser, getJobById);

export default router;
