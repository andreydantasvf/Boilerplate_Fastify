import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const envSchema = z.object({
  NODE_ENV: z.string().default('development'),
  PORT: z.coerce.number().default(3333),
  DATABASE_URL: z.string().default(''),
  JWT_SECRET: z.string().default('secret')
});

export const env = envSchema.parse(process.env);
