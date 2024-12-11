import { Request, Response } from 'express';
import * as authService from '../services/authService';
import { validateLoginInput, validateRegisterInput } from '../utils/validation';

export const login = async (req: Request, res: Response) => {
    try {
        const { username, password } = req.body;
        
        // Validate input
        const validationError = validateLoginInput(username, password);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const result = await authService.login(username, password);
        if ('error' in result) {
            return res.status(401).json({ error: result.error });
        }

        res.json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error during login' });
    }
};

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password, name } = req.body;

        // Validate input
        const validationError = validateRegisterInput(username, email, password, name);
        if (validationError) {
            return res.status(400).json({ error: validationError });
        }

        const result = await authService.register({ username, email, password, name });
        if ('error' in result) {
            return res.status(400).json({ error: result.error });
        }

        res.status(201).json(result);
    } catch (error) {
        res.status(500).json({ error: 'Error during registration' });
    }
}; 