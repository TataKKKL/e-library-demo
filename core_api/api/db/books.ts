import { supabase } from '../lib/supabase';
import { Book } from '../models/book';

export const getBooks = async (): Promise<Book[]> => {
  const { data, error } = await supabase.from('books').select('*');
  if (error) throw new Error(error.message);
  return data as Book[];
};

export const getBookById = async (id: string): Promise<Book | null> => {
  const { data, error } = await supabase
    .from('books')
    .select('*')
    .eq('id', id)
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

export const updateBook = async (id: string, updates: Partial<Book>): Promise<Book> => {
  const { data, error } = await supabase
    .from('books')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw new Error(error.message);
  return data as Book;
};

export const deleteBook = async (id: string): Promise<void> => {
  const { error } = await supabase
    .from('books')
    .delete()
    .eq('id', id);

  if (error) throw new Error(error.message);
};