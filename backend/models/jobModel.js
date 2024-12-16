import mongoose from "mongoose";

let jobSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    requirements: [
      {
        type: String,
      },
    ],
    experience: {
      type: Number,
    },
    salary: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    jobType: {
      type: String,
      required: true,
    },
    position: {
      type: Number,
      required: true,
    },
    company: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "company",
    },
    created_by: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "user",
    },
    applications: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "application",
      },
    ],
  },
  { timeStamps: true }
);

export default jobSchema = mongoose.model("job", jobSchema);
