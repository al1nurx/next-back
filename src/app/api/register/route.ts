import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const { name, surname, email, password } = await req.json();

    const result = await authService.register(name, surname, email, password);

    return Response.json(result);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return Response.json({ message: error.message }, { status: 400 });
    }

    return Response.json({ message: "Unknown error" }, { status: 400 });
  }
}
