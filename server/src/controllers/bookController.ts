import { Request, Response } from 'express';
import * as bookService from '../services/bookService';

export const getAllBooks = async (req: Request, res: Response) => {
    try {
        const books = await bookService.getAllBooks();
        res.json(books);
    } catch (error) {
        res.status(500).json({ error: 'Error fetching books' });
    }
};

export const createBook = async (req: Request, res: Response) => {
    try {
        const { title, content } = req.body;
        const book = await bookService.createBook({ title, content });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error creating book' });
    }
};

export const updateBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        const { title, content } = req.body;
        const book = await bookService.updateBook(Number(id), { title, content });
        res.json(book);
    } catch (error) {
        res.status(500).json({ error: 'Error updating book' });
    }
};

export const deleteBook = async (req: Request, res: Response) => {
    try {
        const { id } = req.params;
        await bookService.deleteBook(Number(id));
        res.json({ message: 'Book deleted' });
    } catch (error) {
        res.status(500).json({ error: 'Error deleting book' });
    }
}; 