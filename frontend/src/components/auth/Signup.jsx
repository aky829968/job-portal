import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Signup = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    name: "",
    email: "",
    password: "",
    role: "",
    phone: "",
  });
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleFile = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log(input);
    const formData = new FormData();
    formData.append("name", input.name);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("role", input.role);
    formData.append("phone", input.phone);
    if (input.file) {
      formData.append("file", input.file);
    }
    // console.log(formData);
    const res = await axios.post(
      "http://localhost:3000/user/register",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-aata",
        },
        withCredentials: true,
      }
    );
    if (res.data.success) {
      navigate("/login");
      toast.success(res.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center max-w-7xl ">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 border border-slate-500 rounded-md p-4 my-4"
      >
        <h1 className="text-2xl font-semibold text-blue-600">Signup Form</h1>
        <div className="mt-2">
          <Label className="text-md ">Fullname</Label>
          <Input
            name="name"
            onChange={handleInput}
            value={input.name}
            type="text"
            placeholder="John"
          ></Input>
        </div>
        <div className="mt-2">
          <Label className="text-md ">Email</Label>
          <Input
            name="email"
            onChange={handleInput}
            value={input.email}
            type="email"
            placeholder="John@gmail.com"
          ></Input>
        </div>
        <div className="mt-2">
          <Label className="text-md ">Phone Number</Label>
          <Input
            name="phone"
            onChange={handleInput}
            value={input.phone}
            type="number"
            placeholder="12345"
          ></Input>
        </div>
        <div className="mt-2">
          <Label className="text-md ">Password</Label>
          <Input
            name="password"
            onChange={handleInput}
            value={input.password}
            type="password"
            placeholder=""
          ></Input>
        </div>

        <div className="">
          <RadioGroup className="flex mt-2 ">
            <div className="flex items-center text-md space-x-2">
              <Input
                type="radio"
                name="role"
                value="student"
                checked={input.role === "student"}
                onChange={handleInput}
              ></Input>
              <Label htmlFor="r2">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="radio"
                name="role"
                value="recruiter"
                checked={input.role === "recruiter"}
                onChange={handleInput}
              ></Input>
              <Label htmlFor="r3">Recruiter</Label>
            </div>
          </RadioGroup>
          <div>
            <Label>Profile</Label>
            <Input
              type="file"
              accept="image/*"
              //   name="profile"
              //   value={input.profile}
              onChange={handleFile}
            ></Input>
          </div>
        </div>
        <Button type="submit" className="bg-blue-700 my-2">
          Submit
        </Button>
        <h2>
          Already have an account{" "}
          <span className="text-blue-800 font-medium">
            <Link to="/login">Login</Link>
          </span>
        </h2>
      </form>
    </div>
  );
};

export default Signup;
