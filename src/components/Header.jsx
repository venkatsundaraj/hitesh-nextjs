"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import PrimaryButton from "./PrimaryButton";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useRouter } from "next/navigation";

function Header() {
  const [LoggedIn, setLoggedIn] = useState(true);
  const router = useRouter();

  const loggedOutHandler = async function (e) {
    try {
      console.log(e);
      const respone = await axios.get("/api/user/logout");
      console.log(respone.data);
      toast.success(respone.data.message);
      router.push("/login");
    } catch (err) {
      console.log(err);
      toast.error(err.message);
    }
  };
  return (
    <header className="bg-violet-300 px-4 py-6 w-full overflow-hidden ">
      <ul className="w-full text-2xl flex h-full items-center justify-end gap-6 list-none text-slate-200">
        <li>
          <Link href="/login">Login</Link>
        </li>
        <li>
          <Link href="/register">Register</Link>
        </li>
        <li>
          <Link href="/profile">Home</Link>
        </li>
        {LoggedIn && <button onClick={loggedOutHandler}>Logout</button>}
      </ul>
    </header>
  );
}

export default Header;
