import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth-context";
import { bookingService } from "@/services/booking.service";

export async function GET(req: NextRequest) {
  try {
    const { userId, role } = getAuth(req);

    const bookings = await bookingService.getBookings(role, userId);
    return NextResponse.json(bookings);
  } catch (error: any) {
    const status = error.message == "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message: error.message }, { status });
  }
}

export async function POST(req: NextRequest) {
  try {
    const { userId } = getAuth(req);
    const body = await req.json();

    const newBooking = await bookingService.createBooking(userId, {
      spaceId: body.spaceId,
      purpose: body.purpose,
      startTime: new Date(body.startTime),
      endTime: new Date(body.endTime),
    });

    return NextResponse.json(newBooking, { status: 201 });
  } catch (error: any) {
    const status = error.message === "Unauthorized" ? 401 : 400;
    return NextResponse.json({ message: error.message }, { status });
  }
}
