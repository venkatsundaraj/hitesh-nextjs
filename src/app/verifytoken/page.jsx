"use client";

import React from "react";
import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link";
import PrimaryButton from "@/components/PrimaryButton";

function VerifyToken() {
  const [urlToken, setUrlToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState({});

  const verifyTokenHandler = async function () {
    try {
      const verifiedTokenUrl = await axios.post("/api/verifyemail", {
        urlToken,
      });
      console.log(verifiedTokenUrl);
      if (verifiedTokenUrl.data.user) setVerified(true);
    } catch (err) {
      setError(err);
      console.log(err.response.data);
    }
  };

  useEffect(() => {
    const token = window.location.href.split("=")[1];
    setUrlToken(token || "");
  }, []);

  useEffect(() => {
    if (urlToken.length > 0) {
      verifyTokenHandler();
    }
  }, [urlToken]);
  return (
    <section className="min-w-screen min-h-screen bg-violet-50 flex flex-col items-center justify-content-center">
      <h1 className="text-3xl text-pink-500">
        {verified ? "Email verified" : "Verifying the Email"}
      </h1>
      <h2>{urlToken ? urlToken : "no token"}</h2>
      {verified && (
        <div>
          <PrimaryButton>
            <Link className="decoration-none" href="/login">
              Click here to Login
            </Link>
          </PrimaryButton>
        </div>
      )}
      {error && !verified && <h3>{error.message}</h3>}
    </section>
  );
}

export default VerifyToken;
