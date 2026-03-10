import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "@/lib/auth-context";
import { bookingService } from "@/services/booking.service";

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { userId, role } = getAuth(req);
    const { id } = await params;
    const bookingId = Number(id);

    await bookingService.cancelBooking(bookingId, userId, role);

    return NextResponse.json({ message: "Успешно удалено" });
  } catch (error: any) {
    let status = 400;
    if (error.message === "Unauthorized") status = 401;
    if (error.message.includes("Forbidden")) status = 403;

    return NextResponse.json({ message: error.message }, { status });
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  try {
    const { role } = getAuth(req);
    const { id } = await params;
    const bookingId = Number(id);
    const { status } = await req.json();

    const updated = await bookingService.changeStatus(bookingId, role, status);

    return NextResponse.json(updated);
  } catch (error: any) {
    let statusCode = 400;
    if (error.message === "Unauthorized") statusCode = 401;
    if (error.message.includes("Forbidden")) statusCode = 403;

    return NextResponse.json(
      { message: error.message },
      { status: statusCode },
    );
  }
}
