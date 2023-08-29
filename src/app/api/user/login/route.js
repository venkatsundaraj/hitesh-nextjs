import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

import user from "@/models/user";
import mongoDb from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";

mongoDb();

export async function POST(req, res) {
  try {
    const { email, password } = await req.json();

    const existedUser = await user.findOne({ email: email });

    if (!existedUser) {
      return NextResponse.json(
        { message: "Please register your credentials first" },
        { status: "400" }
      );
    }

    const comparedPassword = await bcryptjs.compare(
      password,
      existedUser.password
    );

    if (!comparedPassword) {
      return NextResponse.json(
        { message: "Please enter the correct password" },
        { status: "400" }
      );
    }

    const token = await jwt.sign(
      {
        id: existedUser._id,
      },
      process.env.JWT_TOKEN,
      { expiresIn: "1d" }
    );
    const response = NextResponse.json(
      { message: "user loggedin successfully", user: existedUser },
      { status: "200" }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
    });

    return response;
  } catch (err) {
    NextResponse.json({ message: "something went wrong" }, { status: "500" });
  }
}
