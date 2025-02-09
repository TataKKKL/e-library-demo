import { getBooks, getBookByTitle } from '../db/books';
import { Book } from '../models/book';

// Service function to fetch books
export const fetchBooks = async (): Promise<Book[]> => {
  return await getBooks();
};

export const fetchBookByTitle = async (title: string): Promise<Book | null> => {
  return await getBookByTitle(title);
};