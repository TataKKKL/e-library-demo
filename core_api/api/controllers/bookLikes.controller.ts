// bookLikes.controller.ts (Controller Layer)
import { Request, Response } from 'express';
import { toggleLike, fetchBookLikes, fetchUserBookLikes } from '../services/bookLikes.service';

export const toggleBookLikeController = async (req: Request, res: Response) => {
  try {
    const profileId = req.user?.id; // Assuming you have authentication middleware that adds user to req
    if (!profileId) {
      return res.status(401).json({ error: 'Unauthorized' });
    }

    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const isLiked = await toggleLike(profileId, bookId);
    return res.status(200).json({ liked: isLiked });
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookLikesController = async (req: Request, res: Response) => {
  try {
    const bookId = parseInt(req.params.bookId);
    if (isNaN(bookId)) {
      return res.status(400).json({ error: 'Invalid book ID' });
    }

    const likes = await fetchBookLikes(bookId);
    return res.status(200).json(likes);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getUserLikesController = async (req: Request, res: Response) => {
  try {
    const profileId = req.user?.id; // Assuming you have authentication middleware
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