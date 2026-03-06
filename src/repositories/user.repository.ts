import { prisma } from "@/lib/prisma";

export const userRepository = {
  create(data: {
    name: string;
    surname: string;
    email: string;
    password: string;
  }) {
    return prisma.user.create({ data });
  },

  findByEmail(email: string) {
    return prisma.user.findUnique({
      where: { email },
    });
  },

  findAll() {
    return prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
      },
    });
  },

  findById(id: number) {
    return prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        surname: true,
      },
    });
  },
};
