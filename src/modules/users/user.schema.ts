import { z } from 'zod/v4';

export const createUserSchema = z.object({
  email: z
    .string({ message: 'E-mail is required' })
    .email('Invalid E-mail')
    .min(1, 'E-mail is required'),
  name: z.string({ message: 'Name is required' }).min(1, 'Name is required'),
  password: z
    .string({ message: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
});

export const userIdSchema = z.object({
  id: z
    .string({ message: 'ID is required' })
    .cuid('Invalid ID')
    .min(1, 'ID is required')
});

export const updateUserSchema = createUserSchema.partial();

export type CreateUserInput = z.infer<typeof createUserSchema>;
