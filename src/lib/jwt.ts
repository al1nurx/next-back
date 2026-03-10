import jwt from "jsonwebtoken";
import { ROLE } from "@/generated/prisma/enums";

export interface TokenPayload {
  userId: number;
  role: ROLE;
}

export function generateToken(userId: number, role: ROLE) {
  return jwt.sign({ userId, role }, process.env.JWT_SECRET!, {
    expiresIn: "7d",
  });
}

export function verifyToken(token: string): TokenPayload {
  return jwt.verify(token, process.env.JWT_SECRET!) as TokenPayload;
}
