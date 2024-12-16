import applicationModel from "../models/applicationModel.js";
import jobModel from "../models/jobModel.js";

export const applyJob = async (req, res) => {
  try {
    const userId = req.id;
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    const existingApplication = await applicationModel.findOne({
      job: jobId,
      applicant: userId,
    });
    if (existingApplication) {
      return res
        .status(400)
        .json({ message: "Already applied", success: false });
    }
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    const newApplication = await applicationModel.create({
      job: jobId,
      applicant: userId,
    });
    job.applications.push(newApplication._id);
    await job.save();
    return res
      .status(201)
      .json({ message: "Job applied successfuly", success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

export const getAppliedJobs = async (req, res) => {
  try {
    const userId = req.id;
    const applications = await applicationModel
      .find({ applicant: userId })
      .sort({ createdAt: -1 })
      .populate({
        path: "job",
        options: { sort: { createdAt: -1 } },
        populate: {
          path: "company",
          options: { sort: { createdAt: -1 } },
        },
      });
    if (!applications) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    return res.status(201).json({ applications, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
//for admin to see how many applied
// export const getApplicants=await(req,res)=>{
//     const jobId=req.params.id;
//     const job=await jobModel.findById(jobId).populate({
//         path:'applications'
//     })
// }

export const getApplicants = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId).populate({
      path: "applications",
      options: { sort: { createdAt: -1 } },
      populate: {
        path: "applicant",
        options: { sort: { createdAt: -1 } },
      },
    });
    if (!job) {
      return res.status(400).json({ message: "Job not found", success: false });
    }
    return res.status(200).json({ job, success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

export const updateStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const applicationId = req.params.id;
    if (!status) {
      return res
        .status(400)
        .json({ message: "status not found", success: false });
    }
    const application = await applicationModel.findOne({ _id: applicationId });
    if (!application) {
      return res.status(400).json({ message: " not found", success: false });
    }
    application.status = status.toLowerCase();
    await application.save();
    return res.status(200).json({ message: "Status updated successfully" });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};
