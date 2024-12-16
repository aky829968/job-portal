import React, { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { RadioGroup } from "../ui/radio-group";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "sonner";

const Login = () => {
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });
  const handleInput = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(input);
    const res = await axios.post("http://localhost:3000/user/login", input, {
      headers: {
        "Content-Type": "application/json",
      },
      withCredentials: true,
    });
    if (res.data.success) {
      navigate("/");
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <div className="flex justify-center items-center max-w-7xl ">
      <form
        onSubmit={handleSubmit}
        className="w-1/3 border border-slate-500 rounded-md p-4 my-4"
      >
        <h1 className="text-2xl font-semibold text-blue-600">Login Form</h1>

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
                value="student"
                checked={input.role === "student"}
                onChange={handleInput}
                type="radio"
                name="role"
              ></Input>
              <Label htmlFor="r2">Student</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                checked={input.role === "recruiter"}
                onChange={handleInput}
                type="radio"
                name="role"
                value="recruiter"
              ></Input>
              <Label htmlFor="r3">Recruiter</Label>
            </div>
          </RadioGroup>
        </div>
        <Button type="submit" className="bg-blue-700 my-2">
          Login
        </Button>
        <h2>
          Don't have an account{" "}
          <span className="text-blue-800 font-medium">
            <Link to="/signup">Signup</Link>
          </span>
        </h2>
      </form>
    </div>
  );
};

export default Login;
