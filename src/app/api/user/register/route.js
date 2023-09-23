import mongoDb from "@/dbConfig/dbConfig";
import user from "@/models/user";
import bcryptjs from "bcryptjs";
import mongoose from "mongoose";
import { NextResponse, NextRequest } from "next/server";
import { sendEmail } from "@/helpers/sendEmailer";

mongoDb();

export async function POST(req, res) {
  try {
    const { userName, email, password } = await req.json();
    if (!userName || !password || !email) {
      // throw new Error("You should enter all the fields");
      return NextResponse.json(
        { err: "you shold provide details" },
        { status: "402" }
      );
    }
    const existedUser = await user.findOne({
      email: email,
    });

    if (existedUser) {
      return NextResponse.json(
        { message: "User already exist" },
        { status: "400" }
      );
    }

    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);

    const newUser = await new user({
      userName,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    const data = await sendEmail(savedUser.email, "VERIFY", savedUser._id);

    console.log(data);

    return NextResponse.json(
      { message: "user data uploaded successfully", user: savedUser },
      { status: "201" }
    );
  } catch (err) {
    console.log(err.message);
    NextResponse.json({ err: err.message }, { status: "402" });
  }
}
