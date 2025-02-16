// bookLikes.controller.ts (Controller Layer)
import { Request, Response } from 'express';
import { 
  addLike, 
  fetchBookLikes, 
  fetchUserBookLikes,
  removeLike,
  fetchBookLikeStatus
} from '../services/bookLikes.service';

export const getBookLikeStatusController = async (req: Request, res: Response) => {
  try {
    const profileId = req.user?.id;
    if (!profileId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const isLiked = await fetchBookLikeStatus(profileId, bookId);
    return res.status(200).json({ isLiked });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const addBookLikeController = async (req: Request, res: Response) => {
  try {
    const profileId = req.user?.id;
    if (!profileId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const AddedNewLike = await addLike(profileId, bookId);
    return res.status(200).json({ addednewlike: AddedNewLike });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const removeBookLikeController = async (req: Request, res: Response) => {
  try {
    const profileId = req.user?.id;
    if (!profileId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    await removeLike(profileId, bookId);
    return res.status(200).json({ message: 'Like removed successfully' });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookLikesController = async (req: Request, res: Response) => {
  try {
    const userEmail = req.user?.email;
    if (!userEmail) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    try {
      const likes = await fetchBookLikes(bookId, userEmail);
      return res.status(200).json(likes);
    } catch (error: any) {
      if (error.message === 'Unauthorized: Admin access required') {
        return res.status(403).json({ error: 'Forbidden: Admin access required' });
      }
      throw error;
    }
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserLikesController = async (req: Request, res: Response) => {
  try {
    const profileId = req.user?.id;
    if (!profileId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const likes = await fetchUserBookLikes(profileId);
    return res.status(200).json(likes);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};