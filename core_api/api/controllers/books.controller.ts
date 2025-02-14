// books.controller.ts (Controller Layer)
import { Request, Response } from 'express';
import { 
  fetchBooks, 
  fetchBookByTitle, 
  addBook, 
  modifyBook, 
  removeBook 
} from '../services/books.service';

export const getBooksController = async (req: Request, res: Response) => {
  try {
    const books = await fetchBooks();
    return res.status(200).json(books);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getBookByTitleController = async (req: Request, res: Response) => {
  try {
    const title = req.params.title;
    const book = await fetchBookByTitle(title);
    
    if (!book) {
      return res.status(404).json({ error: 'Book not found' });
    }
    
    return res.status(200).json(book);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const createBookController = async (req: Request, res: Response) => {
  try {
    const bookData = req.body;
    const newBook = await addBook(bookData);
    return res.status(201).json(newBook);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const updateBookController = async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
    const updates = req.body;
    const updatedBook = await modifyBook(title, updates);
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  try {
    const { title } = req.params;
    await removeBook(title);
    return res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};