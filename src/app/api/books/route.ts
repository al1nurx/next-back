import { NextRequest, NextResponse } from "next/server";
import { bookService } from "@/services/book.service";
import { verifyToken } from "@/lib/jwt";

export async function GET() {
  try {
    const books = await bookService.getAllBooks();

    return NextResponse.json(books);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function POST(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    verifyToken(token);

    const body = await req.json();
    const book = await bookService.createBook({
      title: body.title,
      author: body.author,
      published: new Date(body.published),
    });

    return NextResponse.json(book);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    verifyToken(token);

    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));
    const updateBody = await req.json();

    const updatedBook = await bookService.updateBook(id, {
      title: updateBody.title,
      author: updateBody.author,
      published: updateBody.published
        ? new Date(updateBody.published)
        : undefined,
    });

    return NextResponse.json(updatedBook);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}

export async function DELETE(req: NextRequest) {
  try {
    const authHeader = req.headers.get("authorization");

    if (!authHeader) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const token = authHeader.split(" ")[1];
    verifyToken(token);

    const url = new URL(req.url);
    const id = Number(url.searchParams.get("id"));

    await bookService.deleteBook(id);

    return NextResponse.json({ message: "Book deleted" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ message: error.message }, { status: 400 });
    }

    return NextResponse.json({ message: "Unknown error" }, { status: 400 });
  }
}
