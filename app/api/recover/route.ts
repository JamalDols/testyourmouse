import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

export async function POST(req: NextRequest) {
  try {
    const { token } = await req.json();

    if (!token) {
      return NextResponse.json({ error: "Token is required" }, { status: 400 });
    }

    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET || "default_secret") as any;

      if (decoded.type !== "purchase_recovery") {
        return NextResponse.json({ error: "Invalid token type" }, { status: 400 });
      }

      return NextResponse.json({
        success: true,
        email: decoded.email,
        sessionId: decoded.sessionId,
      });
    } catch (err) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
  } catch (error) {
    console.error("Recovery error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}
