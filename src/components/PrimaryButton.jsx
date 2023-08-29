"use client";

import React from "react";

function PrimaryButton({ children, type }) {
  return (
    <button
      type={type ? type : "button"}
      className="bg-violet-400 rounded-xl py-1 px-3 text-slate-200"
    >
      {children}
    </button>
  );
}

export default PrimaryButton;
