// books.service.ts (Service Layer)
import { getBooks, getBookByTitle, createBook, updateBook, deleteBook } from '../db/books';
import { Book } from '../models/book';

export const fetchBooks = async (): Promise<Book[]> => {
  return await getBooks();
};

export const fetchBookByTitle = async (title: string): Promise<Book | null> => {
  return await getBookByTitle(title);
};

export const addBook = async (bookData: Omit<Book, 'id' | 'created_at'>): Promise<Book> => {
  return await createBook(bookData);
};

export const modifyBook = async (title: string, updates: Partial<Book>): Promise<Book> => {
  return await updateBook(title, updates);
};

export const removeBook = async (title: string): Promise<void> => {
  await deleteBook(title);
};