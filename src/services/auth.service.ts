import { AppError } from '../errors/AppError';
import { prisma } from '../plugins/prisma';
import bcrypt from 'bcrypt';

export async function authenticateUser(data: {
  email: string;
  password: string;
}) {
  const user = await prisma.user.findUnique({ where: { email: data.email } });

  if (!user) {
    throw new AppError('Invalid credentials', 400);
  }

  const isPasswordValid = await bcrypt.compare(data.password, user.password);

  if (!isPasswordValid) {
    throw new AppError('Invalid credentials', 400);
  }

  return { id: user.id, email: user.email, name: user.name };
}
