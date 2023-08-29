import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export async function getDataFromToken(req) {
  try {
    const decodedToken = await jwt.verify(
      req.cookies.get("token")?.value || "",
      process.env.JWT_TOKEN
    );
    if (!decodedToken) {
      throw new Error("need jwt token");
    }
    return decodedToken;
  } catch (err) {
    throw new Error(err);
  }
}
