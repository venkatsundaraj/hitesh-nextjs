import mongoDb from "@/dbConfig/dbConfig";
import user from "@/models/user";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";

mongoDb();

export async function GET(req, res) {
  try {
    const data = await getDataFromToken(req);

    const filteredUser = await user.findById(data.id);

    if (!filteredUser) {
      return NextResponse.json(
        { message: "cannot identify the user" },
        { status: "400" }
      );
    }
    return NextResponse.json({ filteredUser: filteredUser }, { status: "200" });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: err.message }, { status: "400" });
  }
}
