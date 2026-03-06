import bcrypt from "bcrypt";
import { userRepository } from "@/repositories/user.repository";
import { generateToken } from "@/lib/jwt";

export const authService = {
  async register(
    name: string,
    surname: string,
    email: string,
    password: string,
  ) {
    const existingUser = await userRepository.findByEmail(email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await userRepository.create({
      name,
      surname,
      email,
      password: hashed,
    });

    const { password: userPassword, ...userInfo } = user;

    const token = generateToken(user.id);

    return { userInfo, token };
  },

  async login(email: string, password: string) {
    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new Error("Invalid credentials");
    }

    const valid = await bcrypt.compare(password, user.password);

    if (!valid) {
      throw new Error("Invalid credentials");
    }

    const token = generateToken(user.id);

    const { password: userPassword, ...userInfo } = user;

    return { userInfo, token };
  },
};
