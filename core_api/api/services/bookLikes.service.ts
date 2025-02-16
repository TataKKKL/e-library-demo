// bookLikes.service.ts (Service Layer)
import { 
  toggleBookLike, 
  getBookLikes, 
  getUserBookLikes,
  removeBookLike
} from '../db/bookLikes';

export const toggleLike = async (profileId: string, bookId: number): Promise<boolean> => {
  return await toggleBookLike(profileId, bookId);
};

export const removeLike = async (profileId: string, bookId: number): Promise<void> => {
  await removeBookLike(profileId, bookId);
};

export const fetchBookLikes = async (bookId: number, userEmail: string) => {
  return await getBookLikes(bookId, userEmail);
};

export const fetchUserBookLikes = async (profileId: string) => {
  return await getUserBookLikes(profileId);
};