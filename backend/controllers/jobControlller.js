import jobModel from "../models/jobModel.js";

export const jobRegister = async (req, res) => {
  try {
    const {
      title,
      description,
      requirements,
      salary,
      location,
      jobType,
      experience,
      position,
      companyId,
    } = req.body;
    if (
      !title ||
      !description ||
      !requirements ||
      !salary ||
      !location ||
      !jobType ||
      !experience ||
      !position ||
      !companyId
    ) {
      return res
        .status(404)
        .json({ message: "Something is missing", success: false });
    }
    const userId = req.id;
    const job = await jobModel.create({
      title,
      description,
      requirements: requirements.split(","),
      salary: Number(salary),
      location,
      jobType,
      experience,
      position,
      company: companyId,
      created_by: userId,
    });
    return res
      .status(201)
      .json({ message: "Job registered successfuuly", job, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

export const getAllJobs = async (req, res) => {
  try {
    const keyword = req.query.keyword || "";
    const query = {
      $or: [
        { title: { $regex: keyword, $options: "i" } },
        { descrption: { $regex: keyword, $options: "i" } },
      ],
    };
    const jobs = await jobModel
      .find(query)
      .populate({
        path: "company",
      })
      .sort({ createdAt: -1 });
    if (!jobs) {
      return res.status(404).json({ message: "No jobs found", success: false });
    }
    return res.status(200).json({ jobs, success: true });
  } catch (error) {
    res.status(400).json({ message: error.message, success: false });
  }
};

export const getJobById = async (req, res) => {
  try {
    const jobId = req.params.id;
    const job = await jobModel.findById(jobId);
    if (!job) {
      return res.status(404).json({ message: "job not found", success: false });
    }
    return res.status(201).json({ job, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

//Admin job reate
export const getAdminJobs = async (req, res) => {
  try {
    const adminId = req.id;
    const jobs = await jobModel.find({ created_by: adminId });
    if (!jobs) {
      return res
        .status(404)
        .json({ message: "jobs not found", success: false });
    }
    return res.status(201).json({ jobs, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
