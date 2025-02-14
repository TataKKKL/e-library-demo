// books.ts (Database Layer)
import { supabase } from '../lib/supabase';
import { Book } from '../models/book';

export const getBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase.from('books').select('*');
  if (error) throw new Error(error.message);
  return data as Book[];
};

export const getBookByTitle = async (title: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('title', title)
    .single();

  if (error) throw new Error(error.message);
  return data as Book;
};

export const createBook = async (book: Omit<Book, 'id' | 'created_at'>): Promise<Book> => {
  const { data, error } = await supabase
    .from('books')
    .insert([book])
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Book;
};

export const updateBook = async (title: string, updates: Partial<Book>): Promise<Book> => {
  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('title', title)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Book;
};

export const deleteBook = async (title: string): Promise<void> => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('title', title);

  if (error) throw new Error(error.message);
};