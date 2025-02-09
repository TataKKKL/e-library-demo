import { supabase } from '../lib/supabase';
import { Book } from '../models/book';

// Function to get all books
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