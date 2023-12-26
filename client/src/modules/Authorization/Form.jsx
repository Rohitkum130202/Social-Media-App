import React, { useState } from "react";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { message } from "antd";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export default function Form() {
  const navigate = useNavigate();
  const [isSignInPage, setIsSignInPage] = useState(
    window.location.pathname.includes("signin")
  );
  const [data, setData] = useState({
    ...(!isSignInPage && { username: "" }),
    email: "",
    password: "",
  });
  // console.log(data);

  //HAndle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();
    const endpoint = isSignInPage
      ? "http://localhost:8080/api/v1/user/login"
      : "http://localhost:8080/api/v1/user/register";

    try {
      const res = await axios.post(endpoint, data);
      if (res && res.data.success) {
        if (isSignInPage) {
          message.success(res.data.message);
        } else {
          navigate("/account/signin");
          message.success(res.data.message);
        }
      }
      if (res.status === 200 && isSignInPage) {
        const { token, user } = await res.data;
        // console.log(token, "User", user);
        localStorage.setItem("user:token", token);
        navigate("/");
      }
    } catch (error) {
      message.error("Something went wrong");
      console.error(error);
    }
  };
  return (
    // X direction center ke liye we do => justify senter and y direction center  ke liye => items-center
    <div className="bg-[#d2cfdf] h-screen w-full flex justify-center items-center">
      <div className="h-[600px] w-[800px] bg-white flex justify-center items-center">
        <div
          className={`h-full w-full flex flex-col justify-center items-center ${
            !isSignInPage && "order-2"
          }`}
        >
          <div className="text-3xl">Welcome {isSignInPage && "Back"}</div>
          <div className="mb-[10px]">
            Please {isSignInPage ? "Login" : "Register"} to continue
          </div>
          <form
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            {!isSignInPage && (
              <Input
                label="Username"
                type="text"
                placeholder="Enter your Username"
                value={data.username}
                onChange={(e) => setData({ ...data, username: e.target.value })}
              />
            )}

            <Input
              label="Email"
              type="email"
              placeholder="Enter your Email"
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Input
              label="Password"
              type="password"
              placeholder="Enter your Password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
            />

            <Button label={isSignInPage ? "Sign in" : "Register"} />
          </form>
          <div
            className="cursor-pointer"
            onClick={() => setIsSignInPage(!isSignInPage)}
          >
            {isSignInPage ? "Create account for login" : "Sign in"}
          </div>
        </div>
        <div
          className={`border h-full w-full bg-gray-400 ${
            !isSignInPage && "order-1"
          }`}
        ></div>
      </div>
    </div>
  );
}
