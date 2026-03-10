import { userRepository } from "@/repositories/user.repository";

export const userService = {
  async getAll(role: string) {
    if (role === "USER") {
      throw new Error("Forbidden: You don't have access for users");
    }

    const users = await userRepository.findAll();
    return users;
  },

  async getMe(id: number) {
    const user = await userRepository.findById(id);

    if (!user) {
      throw new Error("User not found");
    }

    return user;
  },
};
