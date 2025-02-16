// bookLikes.service.ts (Service Layer)
import { 
  addBookLike, 
  getBookLikes, 
  getUserBookLikes,
  removeBookLike,
  getBookLikeStatus
} from '../db/bookLikes';

export const addLike = async (profileId: string, bookId: number): Promise<boolean> => {
  return await addBookLike(profileId, bookId);
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

export const fetchBookLikeStatus = async (profileId: string, bookId: number): Promise<boolean> => {
  return await getBookLikeStatus(profileId, bookId);
};
