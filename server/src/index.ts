import express from 'express';
import cors from 'cors';
import bookRoutes from './routes/bookRoutes';
import authRoutes from './routes/authRoutes';
import { authenticateToken } from './middleware/auth';

const app = express();

// Middleware
app.use(cors({
    origin: process.env.CLIENT_URL || 'http://localhost:5173',
    credentials: true
}));
app.use(express.json());

// Public routes
app.get('/', (req, res) => {
    res.json({ message: 'API is running' });
});
app.use('/api/auth', authRoutes);

// Protected routes
app.use('/api/books', authenticateToken, bookRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
}); 