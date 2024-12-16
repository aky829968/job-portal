import mongoose from "mongoose";

let userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minLength: [3, "name should be more than 3 characcters"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    phone: {
      type: Number,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recruiter"],
      required: true,
    },
    profile: {
      bio: { type: String },
      skills: [{ type: String }],
      resume: { type: String },
      resumeOriginalName: { type: String },
      company: { type: mongoose.Schema.Types.ObjectId, ref: "company" },
      profile: { type: String, default: "" },
    },
  },
  { timeStamps: true }
);

export default userSchema = mongoose.model("user", userSchema);
