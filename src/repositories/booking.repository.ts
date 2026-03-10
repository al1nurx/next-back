import { prisma } from "@/lib/prisma";
import { STATUS } from "@/generated/prisma/enums";

export const bookingRepository = {
  create(data: {
    spaceId: string;
    purpose: string;
    startTime: Date;
    endTime: Date;
    userId: number;
  }) {
    return prisma.booking.create({ data });
  },

  findAll(filters: any) {
    return prisma.booking.findMany({
      where: filters,
      include: {
        user: {
          select: {
            name: true,
            email: true,
          },
        },
      },
    });
  },

  findById(id: number) {
    return prisma.booking.findUnique({ where: { id } });
  },

  updateStatus(id: number, status: STATUS) {
    return prisma.booking.update({
      where: { id },
      data: { status },
    });
  },

  delete(id: number) {
    return prisma.booking.delete({ where: { id } });
  },
};
