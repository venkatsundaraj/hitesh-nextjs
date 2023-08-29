"use client";
import React from "react";

const session = null;

const Example = function () {
  if (!session) throw new Error("user should authendicated");
  return <h1>Example</h1>;
};

export default Example;
