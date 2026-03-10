import { NextRequest } from "next/server";
import { TokenPayload, verifyToken } from "./jwt";

export function getAuth(req: NextRequest): TokenPayload {
  const authHeader = req.headers.get("authorization");

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new Error("Unauthorized");
  }

  const token = authHeader.split(" ")[1];

  return verifyToken(token);
}
