import React from "react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { LogOut, User2 } from "lucide-react";

const Navbar = () => {
  const user = false;
  return (
    <div className="bg-slate-100">
      <div className="flex justify-between items-center mx-auto max-w-7xl py-4 px-9">
        <h1 className="text-2xl font-bold">
          Naukri<span className="text-blue-600 ">Portal</span>
        </h1>
        <div className="flex items-center gap-4">
          <ul className="flex items-center gap-5 font-semibold text-xl text-emerald-600">
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link>Jobs</Link>
            </li>
            <li>
              <Link>Browse</Link>
            </li>
            <li></li>
          </ul>
          {!user ? (
            <div className="flex items-center gap-3">
              <Link to="/login">
                <Button variant="outline">Login</Button>
              </Link>
              <Link to="/signup">
                <Button className="bg-blue-600 hover:bg-blue-900">
                  Signup
                </Button>
              </Link>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent className="w-72">
                <div>
                  <div className="flex gap-6 space-y-2">
                    <Avatar>
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="@shadcn"
                      />
                    </Avatar>
                    <div>
                      <h2 className="font-semibold text-lg text-blue-600">
                        Aditya kumar
                      </h2>
                      <p className="text-gray-500 text-md">
                        This is the bio sction
                      </p>
                    </div>
                  </div>
                  <div className="flex flex-col items-start mt-3">
                    <div className="flex gap-1 items-center">
                      <User2 />
                      <Button variant="link">View profile</Button>
                    </div>
                    <div className="flex gap-1 items-center">
                      <LogOut />
                      <Button variant="link">Logout</Button>
                    </div>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
