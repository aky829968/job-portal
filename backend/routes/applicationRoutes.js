import express from "express";
import authUser from "../middleware/authUser.js";
import {
  applyJob,
  getApplicants,
  getAppliedJobs,
  updateStatus,
} from "../controllers/applicationController.js";
const router = express.Router();

router.get("/apply/:id", authUser, applyJob);
router.get("/get", authUser, getAppliedJobs);
router.get("/:id/applicants", authUser, getApplicants);
router.post("/status/:id/update", authUser, updateStatus);

export default router;
