import React, { useState } from "react";
import MainWrapper from "../ui/login-wrapper";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import axios from "axios";
import { Button } from "@/components/ui/button";

const LogIn = () => {
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogInInputChanges = (e) => {
    const { name, value } = e.target;

    if (name === "username") {
      setUserName(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async () => {
    try {
      const res = await axios.post("http://localhost:4040/users/login", {
        userName,
        password,
      });
      localStorage.setItem("user", JSON.stringify(res.data.data));
      router.push("/home");
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <MainWrapper>
      <div className="mt-24 px-8 bg-white border shadow-[rgba(0, 0, 0, 0.02) 0px 1px 3px 0px, rgba(27, 31, 35, 0.15) 0px 0px 0px 1px] border-black">
        <div className=" mt-5 text-2xl text-center">
          <h1>Log In</h1>
        </div>
        <div className="py-5">
          <h2>Username</h2>
          <Input
            onChange={handleLogInInputChanges}
            name="username"
            placeholder="Username"
          />
        </div>
        <div className="py-5">
          <h2>Password</h2>
          <Input
            onChange={handleLogInInputChanges}
            name="password"
            placeholder="Password"
          />
        </div>

        <div className="text-center mb-5">
          <Button
            onClick={handleSubmit}
            className="font-bold"
            variant="destructive"
          >
            Log In
          </Button>
        </div>
      </div>
    </MainWrapper>
  );
};

export default LogIn;
