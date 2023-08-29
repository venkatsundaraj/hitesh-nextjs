"use client";

import React, { useState } from "react";
import Title from "@/components/Title";
import PrimaryButton from "@/components/PrimaryButton";
import Input from "@/components/Input";
import { useRouter } from "next/navigation";
import axios from "axios";

function Login() {
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(undefined);
  const formSubmitHandler = async function (e) {
    try {
      e.preventDefault();

      const userData = {
        email: email,
        password: password,
      };
      console.log(userData);
      setLoading(true);
      const res = await axios.post("/api/user/login", userData);

      const data = await res.data;

      if (data.user) {
        router.push(`/profile/${data.user._id}`);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const passwordInputChange = (value) => {
    setPassword(value);
  };
  const emailInputChange = (value) => {
    setEmail(value);
  };

  return (
    <main className="flex w-screen h-screen items-center justify-center flex-col bg-[url('/richard-stachmann-sGhereft5wI-unsplash.jpg')] bg-center bg-no-repeat bg-cover">
      <Title>{loading ? "Processing" : "Login the form"}</Title>
      <form
        onSubmit={formSubmitHandler}
        className="bg-white rounded-lg backdrop-blur-sm backdrop-opacity-20 p-4 min-h-[150px] flex items-start justify-between flex-col"
      >
        <Input
          id="email"
          content="Email"
          type="email"
          inputChange={emailInputChange}
        />
        <Input
          id="password"
          content="Password"
          type="password"
          inputChange={passwordInputChange}
        />
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </form>
    </main>
  );
}

export default Login;
