import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token) {
      res.status(401).json({ message: "Not Authenticated", success: false });
    }
    const user = await jwt.verify(token, process.env.JWT_SECRET);
    if (!user) {
      res.status(401).json({ message: "Not Authenticated", success: false });
    }
    req.id = user.userId;
    next();
  } catch (error) {
    console.log(error);
  }
};
export default authUser;
