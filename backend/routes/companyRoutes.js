import express from "express";
import {
  companyRegister,
  getCompany,
  getCompanyById,
  updateCompany,
} from "../controllers/companyController.js";
import authUser from "../middleware/authUser.js";

const router = express.Router();

router.post("/register", authUser, companyRegister);
router.get("/get-companies", authUser, getCompany);
router.get("/get-company/:id", authUser, getCompanyById);
router.put("/update/:id", authUser, updateCompany);

export default router;
