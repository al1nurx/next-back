import { bookRepository } from "@/repositories/book.repository";

export const bookService = {
  async createBook(data: { title: string; author: string; published: Date }) {
    return bookRepository.create(data);
  },

  async getAllBooks() {
    return bookRepository.findAll();
  },

  async getBookById(id: number) {
    const book = await bookRepository.findById(id);
    if (!book) throw new Error("Book not found");
    return book;
  },

  async updateBook(
    id: number,
    data: { title?: string; author?: string; published?: Date },
  ) {
    const book = await bookRepository.findById(id);
    if (!book) throw new Error("Book not found");
    return bookRepository.update(id, data);
  },

  async deleteBook(id: number) {
    const book = await bookRepository.findById(id);
    if (!book) throw new Error("Book not found");
    return bookRepository.delete(id);
  },
};
