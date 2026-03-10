import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth-context";
import { userService } from "@/services/user.service";

export async function GET(req: NextRequest) {
  try {
    const { role } = getAuth(req);

    const users = await userService.getAll(role);
    return NextResponse.json(users);
  } catch (error: any) {
    const status = error.message == "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message: error.message }, { status });
  }
}
