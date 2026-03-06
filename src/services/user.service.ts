import { userRepository } from "@/repositories/user.repository";

export const userService = {
  async getAll() {
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
