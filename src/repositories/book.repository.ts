import { prisma } from "@/lib/prisma";

export const bookRepository = {
  create(data: { title: string; author: string; published: Date }) {
    return prisma.book.create({ data });
  },

  findAll() {
    return prisma.book.findMany();
  },

  findById(id: number) {
    return prisma.book.findUnique({ where: { id } });
  },

  update(
    id: number,
    data: { title?: string; author?: string; published?: Date },
  ) {
    return prisma.book.update({
      where: { id },
      data,
    });
  },

  delete(id: number) {
    return prisma.book.delete({ where: { id } });
  },
};
