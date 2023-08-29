"use client";

import React, { useState } from "react";

function Input({ id, content, type, inputChange }) {
  const inputChangeHandler = function (e) {
    inputChange(e.target.value);
  };
  return (
    <div className="flex justify-between items-center w-full gap-4">
      <label htmlFor={id}>{content}</label>
      <input
        onChange={inputChangeHandler}
        type={type}
        id={id}
        className="border-yellow-500  focus:border-slate-600 focus:outline-none rounded-sm text-slate-800 bg-gray-400"
      />
    </div>
  );
}

export default Input;
