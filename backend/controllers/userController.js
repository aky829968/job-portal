import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  try {
    const { name, email, password, phone, role } = req.body;
    // console.log(name);
    if (!name || !email || !password || !role || !phone) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    const user = await userModel.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ message: "User Already exists", success: false });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await userModel.create({
      name,
      email,
      password: hashedPassword,
      phone,
      role,
    });
    return res
      .status(200)
      .json({ message: "User registered successflly", success: true });
  } catch (error) {
    return res.status(400).json({ error: error.message, success: false });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    if (!email || !password || !role) {
      return res
        .status(400)
        .json({ message: "Something is missing", success: false });
    }
    let existing = await userModel.findOne({ email });
    if (!existing) {
      return res
        .status(400)
        .json({ message: "User not found", success: false });
    }
    const isMatched = await bcrypt.compare(password, existing.password);

    if (!isMatched) {
      return res
        .status(400)
        .json({ message: "Inavlid pasword", success: false });
    }
    // const token = await
    if (role !== existing.role) {
      return res
        .status(400)
        .json({ message: "Role not matched", success: false });
    }
    const token = await jwt.sign(
      { userId: existing._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" }
    );

    return res
      .status(200)
      .cookie("token", token, {
        maxAge: 1 * 24 * 60 * 60 * 1000,
        httpOnly: true,
        sameSite: "strict",
      })
      .json({ message: "Login successful", success: true, user: existing });
  } catch (error) {
    return res.status(400).json({ message: error.message, success: false });
  }
};

export const logout = async (req, res) => {
  try {
    res
      .status(200)
      .cookie("token", "", { expiresIn: 0 })
      .json({ message: "Logout successfully", success: true });
  } catch (error) {}
};

export const updateProfile = async (req, res) => {
  try {
    const { email, name, phone, bio, skills } = req.body;
    const file = req.file;
    // if (!email || !name || !phone || !bio || !profile) {
    //   return res
    //     .status(400)
    //     .json({ message: "Something is missing", success: false });
    // }
    const userId = req.id;
    const user = await userModel.findById(userId);
    if (skills) {
      const skillsArray = skills.split(",");
    }
    if (name) user.name = name;
    if (email) user.email = email;
    if (phone) user.phone = phone;
    if (bio) user.profile.bio = bio;
    if (skills) user.profile.skills = skillsArray;
    await user.save();
    return res.status(200).json({
      message: "Profile updated successfuly",
      success: false,
      user: user,
    });
  } catch (error) {
    console.log(error);
  }
};
