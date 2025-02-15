// books.controller.ts (Controller Layer)
import { Request, Response } from 'express';
import { 
  fetchBooks, 
  fetchBookById, 
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

export const getBookByIdController = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const book = await fetchBookById(id);
    
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
    const { id } = req.params;
    const updates = req.body;
    const updatedBook = await modifyBook(id, updates);
    return res.status(200).json(updatedBook);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const deleteBookController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await removeBook(id);
    return res.status(204).send();
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ error: 'Internal Server Error' });
  }
};