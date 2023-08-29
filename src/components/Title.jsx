"use client";
import React from "react";

function Title({ children }) {
  return (
    <h1 className="text-primary cursor-default mb-4 bg-title-gradient relative text-transparent bg-clip-text before:content-[''] before:absolute before:w-0 before:h-1 before:bg-violet-500 before:bottom-0 before:left-0 font-bold hover:before:w-full before:transition-width before:ease-out before:duration-500">
      {children}
    </h1>
  );
}

export default Title;
