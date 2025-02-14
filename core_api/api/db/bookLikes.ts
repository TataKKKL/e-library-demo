// bookLikes.ts (Database Layer)
import { supabase } from '../lib/supabase';

interface BookLike {
  profile_id: string;
  book_id: number;
  created_at: string;
}

export const toggleBookLike = async (profileId: string, bookId: number): Promise<boolean> => {
  // First check if the like exists
  const { data: existingLike, error: fetchError } = await supabase
    .from('book_likes')
    .select('*')
    .eq('profile_id', profileId)
    .eq('book_id', bookId)
    .single();

  if (fetchError && fetchError.code !== 'PGRST116') { // PGRST116 is the "not found" error code
    throw new Error(fetchError.message);
  }

  if (existingLike) {
    // Unlike - delete the record
    const { error: deleteError } = await supabase
      .from('book_likes')
      .delete()
      .eq('profile_id', profileId)
      .eq('book_id', bookId);

    if (deleteError) throw new Error(deleteError.message);
    return false; // Indicates the book is now unliked
  } else {
    // Like - insert new record
    const { error: insertError } = await supabase
      .from('book_likes')
      .insert([{ profile_id: profileId, book_id: bookId }]);

    if (insertError) throw new Error(insertError.message);
    return true; // Indicates the book is now liked
  }
};

export const getBookLikes = async (bookId: number): Promise<BookLike[]> => {
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