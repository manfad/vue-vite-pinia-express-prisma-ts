import express, { Request, Response } from 'express';
import cors from 'cors';
import { PrismaClient } from '@prisma/client';

const app = express();
const prisma = new PrismaClient();

// Middleware
app.use(cors());
app.use(express.json());

// Root route
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'API is running' });
});

// Get all posts
app.get('/api/posts', async (req: Request, res: Response) => {
  try {
    const posts = await prisma.post.findMany({
      orderBy: { createdAt: 'desc' },
    });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching posts' });
  }
});

// Create post
app.post('/api/posts', async (req: Request, res: Response) => {
  try {
    const { title, content } = req.body;
    const post = await prisma.post.create({
      data: { title, content },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error creating post' });
  }
});

// Update post
app.put('/api/posts/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { title, content } = req.body;
    const post = await prisma.post.update({
      where: { id: Number(id) },
      data: { title, content },
    });
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: 'Error updating post' });
  }
});

// Delete post
app.delete('/api/posts/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    await prisma.post.delete({
      where: { id: Number(id) },
    });
    res.json({ message: 'Post deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Error deleting post' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
}); 