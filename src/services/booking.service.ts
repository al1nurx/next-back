import { bookingRepository } from "@/repositories/booking.repository";

export const bookingService = {
  async getBookings(role: string, userId: number) {
    if (role === "USER") {
      return bookingRepository.findAll({});
    }

    return bookingRepository.findAll({});
  },

  async createBooking(userId: number, data: any) {
    return bookingRepository.create({ ...data, userId });
  },

  async cancelBooking(id: number, userId: number, role: string) {
    const booking = await bookingRepository.findById(id);
    if (!booking) throw new Error("Booking Not Found");

    if (booking.userId !== userId && role === "USER") {
      throw new Error("Forbidden: You don't own this booking");
    }

    return bookingRepository.delete(id);
  },

  async changeStatus(id: number, role: string, status: string) {
    if (role === "USER") {
      throw new Error("Forbidden: Users cannot approve bookings");
    }

    return bookingRepository.updateStatus(id, status);
  },
};
