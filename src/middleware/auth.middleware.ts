import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "@/lib/jwt";

export function middleware(req: NextRequest) {
  const authHeader = req.headers.get("authorization");

  if (!authHeader) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  try {
    verifyToken(token);
    return NextResponse.next();
  } catch {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
}

export const config = {
  matcher: ["api/protected/:path*"],
};
