import mongoDb from "@/dbConfig/dbConfig";
import { NextResponse, NextRequest } from "next/server";

mongoDb();

export async function GET() {
  try {
    const response = await NextResponse.json({
      message: "logout successful",
      success: true,
    });
    response.cookies.set("token", "", {
      httpOnly: true,
      expires: new Date(0),
    });

    return response;
  } catch (err) {
    NextResponse.json({ message: "something went wrong" }, { status: 500 });
  }
}
