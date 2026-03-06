import { NextRequest, NextResponse } from "next/server";
import { userService } from "@/services/user.service";
import { verifyToken } from "@/lib/jwt";

export async function GET(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    const payload = verifyToken(token) as { userId: number };

    const user = await userService.getMe(payload.userId);

    return NextResponse.json(user);
  } catch (error: unknown) {
    return NextResponse.json(
      {
        message: error instanceof Error ? error.message : "Unauthorized",
      },
      { status: 401 },
    );
  }
}
