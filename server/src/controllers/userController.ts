import { PrismaClient } from "@prisma/client";
import { Request, Response } from "express";
import { hash, compare } from "bcrypt";
import { z } from "zod";
import jsonwebtoken from 'jsonwebtoken';
const { sign, decode, verify } = jsonwebtoken

const prisma = new PrismaClient();

const CreateUserSchema = z.object({
    username: z.string().min(3, { message: "Username must be at least 3 characters long" }),
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
    confirmPassword: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

const LoginUserSchema = z.object({
    email: z.string().email({ message: "Invalid email" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters long" }),
});

export const register = async (req: Request, res: Response) => {
    try {
        let data = CreateUserSchema.parse(req.body);

        if (data.password !== data.confirmPassword) {
            throw new Error("Passwords do not match");
        }

        const hashedPassword = await hash(data.password, 10);
        delete (data as Partial<typeof data>).confirmPassword;


        const newUser = await prisma.user.create({
            data: {
                ...data,
                password: hashedPassword,
            },
        });

        res.status(201).json(newUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
};


export const login = async (req: Request, res: Response) => {
    try {
        const data = LoginUserSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { email: data.email } });
        if (!user) throw new Error("User not found");
        const passwordMatch = await compare(data.password, user.password);
        if (!passwordMatch) throw new Error("Invalid password");
        const token = sign({ userId: user.id }, process.env.JWT_SECRET!);
        res.status(200).json({ token });
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export const getProfile = async (req: Request, res: Response) => {
    try {
        const userId = String(req.params.id);
        const user = await prisma.user.findUnique({ where: { id: String(userId) } });
        if (!user) throw new Error("User not found");
        res.status(200).json(user);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export const getAll = async (req: Request, res: Response) => {
    try {
        const users = await prisma.user.findMany();
        res.status(200).json(users);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export const update = async (req: Request, res: Response) => {
    try {
        const userId = String(req.params.id);
        const data = CreateUserSchema.parse(req.body);
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        const updatedUser = await prisma.user.update({
            where: { id: userId },
            data: {
                ...data,
            },
        });
        res.status(200).json(updatedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}

export const remove = async (req: Request, res: Response) => {
    try {
        const userId = String(req.params.id);
        const user = await prisma.user.findUnique({ where: { id: userId } });
        if (!user) throw new Error("User not found");
        const removedUser = await prisma.user.delete({ where: { id: userId } });
        res.status(200).json(removedUser);
    } catch (error) {
        if (error instanceof Error) {
            res.status(400).json({ error: error.message });
        } else {
            res.status(400).json({ error: 'An unknown error occurred' });
        }
    }
}
