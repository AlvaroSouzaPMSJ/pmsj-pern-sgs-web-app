import { z } from "zod";

export const registerSchema = z.object({
  body: z.object({
    fullName: z.string().min(2, "Name must be at least 2 characters").max(255),
    email: z.string().email("Invalid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
  }),
});

export const loginSchema = z.object({
  body: z.object({
    email: z.string().email(),
    password: z.string(),
  }),
});

export const updateUserSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid user ID"),
  }),
  body: z.object({
    fullName: z.string().min(2).max(255).optional(),
    email: z.string().email().optional(),
  }),
});