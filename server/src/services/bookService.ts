import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const getAllBooks = async () => {
    return await prisma.book.findMany({
        orderBy: { createdAt: 'desc' },
    });
};

export const createBook = async (data: { title: string; content: string }) => {
    return await prisma.book.create({
        data,
    });
};

export const updateBook = async (id: number, data: { title: string; content: string }) => {
    return await prisma.book.update({
        where: { id },
        data,
    });
};

export const deleteBook = async (id: number) => {
    return await prisma.book.delete({
        where: { id },
    });
}; 