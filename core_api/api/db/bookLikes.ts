// bookLikes.ts (Database Layer)
import { supabase } from '../lib/supabase';

interface BookLike {
  profile_id: string;
  book_id: number;
  created_at: string;
}

export const addBookLike = async (profileId: string, bookId: number): Promise<boolean> => {
  // First check if like already exists
  const { data: existingLike, error: fetchError } = await supabase
    .from('book_likes')
    .select('*')
    .eq('profile_id', profileId)
    .eq('book_id', bookId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') {
    throw new Error(fetchError.message);
  }

  // If like already exists, do nothing and return false (no change made)
  if (existingLike) {
    return false;
  }

  // If no existing like, add new like
  const { error: insertError } = await supabase
    .from('book_likes')
    .insert([{ profile_id: profileId, book_id: bookId }]);

  if (insertError) throw new Error(insertError.message);
  return true; // Return true to indicate a like was added
};

export const removeBookLike = async (profileId: string, bookId: number): Promise<void> => {
  const { error } = await supabase
    .from('book_likes')
    .delete()
    .eq('profile_id', profileId)
    .eq('book_id', bookId);

  if (error) throw new Error(error.message);
};

export const getBookLikes = async (bookId: number, userEmail: string): Promise<BookLike[]> => {
  const { data, error } = await supabase
    .from('book_likes')
    .select('*')
    .eq('book_id', bookId);

  if (error) throw new Error(error.message);
  return data as BookLike[];
};

export const getUserBookLikes = async (profileId: string): Promise<BookLike[]> => {
  const { data, error } = await supabase
    .from('book_likes')
    .select('*')
    .eq('profile_id', profileId);

  if (error) throw new Error(error.message);
  return data as BookLike[];
};

export const getBookLikeStatus = async (profileId: string, bookId: number): Promise<boolean> => {
  const { data, error } = await supabase
    .from('book_likes')
    .select('*')
    .eq('profile_id', profileId)
    .eq('book_id', bookId)
    .single();

  if (error && error.code !== 'PGRST116') {
    throw new Error(error.message);
  }

  return !!data;
};
