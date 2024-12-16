import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import userRouter from "./routes/userRoutes.js";
import companyRoutes from "./routes/companyRoutes.js";
import jobRoutes from "./routes/jobRoutes.js";
import applicationRoutes from "./routes/applicationRoutes.js";

import connectDb from "./connectDb/db.js";

const app = express();
connectDb();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const corsOptions = {
  origin: "http://localhost:5173",
  credentials: true,
};
app.use(cors(corsOptions));

//api
app.use("/user", userRouter);
app.use("/company", companyRoutes);
app.use("/job", jobRoutes);
app.use("/application", applicationRoutes);
const port = 3000;

app.listen(port, () => {
  console.log(`Server started in ${port}`);
});
