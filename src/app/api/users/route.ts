import { NextResponse } from "next/server";
import { userService } from "@/services/user.service";

export async function GET() {
  const users = await userService.getAll();

  return NextResponse.json(users);
}
