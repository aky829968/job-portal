import mongoose from "mongoose";

const connectDb = () => {
  mongoose
    .connect("mongodb://localhost:27017/portal")
    .then(() => {
      console.log("Database connected successfully");
    })
    .catch((error) => {
      console.log(error);
    });
};
export default connectDb;
