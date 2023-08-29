"use client";
import Title from "@/components/Title";
import React, { useState } from "react";
import Input from "@/components/Input";
import PrimaryButton from "@/components/PrimaryButton";
import axios from "axios";
import { useRouter } from "next/navigation";

function Register() {
  const router = useRouter();

  const [userName, setusername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(undefined);

  const formSubmitHandler = async function (e) {
    try {
      e.preventDefault();

      const userData = {
        userName: userName,
        email: email,
        password: password,
      };

      if (password !== confirmPassword) return;
      setLoading(true);
      const res = await axios.post("/api/user/register", userData);

      const data = await res.data;
      console.log(data);
      if (data.user) {
        router.push("/login");
      } else if (data.err) {
        throw new Error(data.err);
      }
    } catch (err) {
      console.log(err);
      throw new Error(err);
    } finally {
      setLoading(false);
    }
  };

  const userInputChange = (value) => {
    setusername(value);
  };
  const emailInputChange = (value) => {
    setEmail(value);
  };
  const passwordChangeHandler = (e) => {
    setPassword(e.target.value);
  };
  const confirmPasswordChangeHandler = (e) => {
    setConfirmPassword(e.target.value);
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center flex-col bg-[url('/richard-stachmann-sGhereft5wI-unsplash.jpg')] bg-center bg-no-repeat bg-cover">
      <Title>{loading ? "Processing" : "Register the form"}</Title>
      <form
        onSubmit={formSubmitHandler}
        className="bg-white rounded-lg backdrop-blur-sm backdrop-opacity-20 p-4 min-h-[200px] flex items-start justify-between flex-col"
      >
        <Input
          id="username"
          content="User Name"
          type="text"
          inputChange={userInputChange}
        />
        <Input
          id="email"
          content="Email"
          type="email"
          inputChange={emailInputChange}
        />
        <div className="flex justify-between items-center w-full gap-4">
          <label htmlFor="password">password</label>
          <input
            onChange={passwordChangeHandler}
            type="password"
            id="password"
            className="border-yellow-500  focus:border-slate-600 focus:outline-none rounded-sm text-slate-800 bg-gray-400"
          />
        </div>
        <div className="flex justify-between items-center w-full gap-4">
          <label htmlFor="confirmpassword">Confirm Password</label>
          <input
            onChange={confirmPasswordChangeHandler}
            type="password"
            id="confirmpassword"
            className="border-yellow-500  focus:border-slate-600 focus:outline-none rounded-sm text-slate-800 bg-gray-400"
          />
        </div>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </main>
  );
}

export default Register;
