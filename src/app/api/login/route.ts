import { authService } from "@/services/auth.service";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    const result = await authService.login(email, password);

    return Response.json(result);
  } catch (error: any) {
    return Response.json({ error: error.message }, { status: 400 });
  }
}
