import companyModel from "../models/companyModel.js";

export const companyRegister = async (req, res) => {
  try {
    const { companyName } = req.body;
    // console.log(name);
    if (!companyName) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    const company = await companyModel.findOne({ companyName });
    if (company) {
      return res
        .status(400)
        .json({ message: "company Already exists", success: false });
    }
    const userId = req.id;
    await companyModel.create({
      companyName,
      userId: userId,
    });
    return res
      .status(200)
      .json({ message: "Company registered successflly", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const getCompany = async (req, res) => {
  const userId = req.id;
  try {
    const companies = await companyModel.find({ userId });
    if (!companies) {
      return res
        .status(404)
        .json({ message: "Companies not found", success: false });
    }
    return res.status(201).json({ companies, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
export const getCompanyById = async (req, res) => {
  try {
    const userId = req.params.id;
    const company = await companyModel.findById(userId);
    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res.status(201).json({ company, success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const updateCompany = async (req, res) => {
  try {
    const { name, location, website, description } = req.body;

    const company = await companyModel.findByIdAndUpdate(
      req.params.id,
      { name, location, website, description },
      { new: true }
    );

    if (!company) {
      return res
        .status(404)
        .json({ message: "Company not found", success: false });
    }
    return res
      .status(200)
      .json({ message: "Company updated successfully", success: true });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};
