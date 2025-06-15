import { z } from 'zod';

export const loginSchema = z.object({
  email: z
    .string({ message: 'E-mail is required' })
    .email('Invalid E-mail')
    .min(1, 'E-mail is required'),
  password: z
    .string({ message: 'Password is required' })
    .min(6, 'Password must be at least 6 characters long')
});

export type loginInput = z.infer<typeof loginSchema>;
