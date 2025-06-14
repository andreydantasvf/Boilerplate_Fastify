import { z } from 'zod';

export const createUserSchema = z.object({
  email: z.string().email('Email inválido').min(1, 'Email é obrigatório'),
  name: z.string().min(1, 'Nome é obrigatório'),
  password: z.string().min(6, 'Senha é obrigatória')
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
