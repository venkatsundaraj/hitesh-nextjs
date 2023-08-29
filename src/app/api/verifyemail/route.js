import mongoDb from "@/dbConfig/dbConfig";
import user from "@/models/user";
import { NextRequest, NextResponse } from "next/server";

mongoDb();
export const POST = async function (req) {
  try {
    const { urlToken } = await req.json();

    console.log(urlToken);

    if (!urlToken) {
      return NextResponse.json(
        { messsage: "cannot verify the token" },
        { status: "400" }
      );
    }

    const verifiedUser = await user.findOne({
      verifiedToken: urlToken,
      verifiedTokenExpiry: { $gt: Date.now() },
    });

    if (!verifiedUser) {
      return NextResponse.json(
        { messsage: "cannot verify the token" },
        { status: "400" }
      );
    }

    verifiedUser.isVerified = true;
    verifiedUser.verifiedToken = undefined;
    verifiedUser.verifiedTokenExpiry = undefined;

    await verifiedUser.save();
    return NextResponse.json(
      { messsage: "success", user: verifiedUser },
      { status: "200" }
    );
  } catch (err) {
    return NextResponse.json({ err: err }, { status: "500" });
  }
};
