import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

interface RegisterInput {
    username: string;
    email: string;
    password: string;
    name: string;
}

export const login = async (username: string, password: string) => {
    const user = await prisma.user.findUnique({ where: { username } });
    
    if (!user) {
        return { error: 'User not found' };
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
        return { error: 'Invalid password' };
    }

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name
        }
    };
};

export const register = async (input: RegisterInput) => {
    // Check if user already exists
    const existingUser = await prisma.user.findFirst({
        where: {
            OR: [
                { email: input.email },
                { username: input.username }
            ]
        }
    });

    if (existingUser) {
        return { error: 'User already exists' };
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(input.password, 10);

    // Create new user
    const user = await prisma.user.create({
        data: {
            ...input,
            password: hashedPassword
        }
    });

    const token = jwt.sign(
        { userId: user.id, username: user.username },
        JWT_SECRET,
        { expiresIn: '24h' }
    );

    return {
        token,
        user: {
            id: user.id,
            username: user.username,
            email: user.email,
            name: user.name
        }
    };
}; 