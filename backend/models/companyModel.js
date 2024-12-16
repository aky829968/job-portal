import mongoose from "mongoose";

let companySchema = mongoose.Schema(
  {
    companyName: {
      type: String,
      required: true,
    },
    location: {
      type: String,
    },
    description: {
      type: String,
    },
    logo: {
      type: String,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timeStamps: true }
);

export default companySchema = mongoose.model("company", companySchema);
