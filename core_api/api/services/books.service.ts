// books.service.ts (Service Layer)
import { getBooks, getBookById, createBook, updateBook, deleteBook } from '../db/books';
import { Book } from '../models/book';

export const fetchBooks = async (): Promise<Book[]> => {
  return await getBooks();
};

export const fetchBookById = async (id: string): Promise<Book | null> => {
  return await getBookById(id);
};

export const addBook = async (bookData: Omit<Book, 'id' | 'created_at'>): Promise<Book> => {
  return await createBook(bookData);
};

export const modifyBook = async (id: string, updates: Partial<Book>): Promise<Book> => {
  return await updateBook(id, updates);
};

export const removeBook = async (id: string): Promise<void> => {
  await deleteBook(id);
};