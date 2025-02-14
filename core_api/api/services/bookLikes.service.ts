// bookLikes.service.ts (Service Layer)
import { toggleBookLike, getBookLikes, getUserBookLikes } from '../db/bookLikes';

export const toggleLike = async (profileId: string, bookId: number): Promise<boolean> => {
  return await toggleBookLike(profileId, bookId);
};

export const fetchBookLikes = async (bookId: number) => {
  return await getBookLikes(bookId);
};

export const fetchUserBookLikes = async (profileId: string) => {
  return await getUserBookLikes(profileId);
};