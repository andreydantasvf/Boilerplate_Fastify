import { hash } from 'bcrypt';
import { prisma } from '../plugins/prisma';
import { AppError } from '../errors/AppError';

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const userExists = await prisma.user.findFirst({
    where: { email: data.email }
  });

  if (userExists) {
    throw new AppError('User already exists', 400);
  }

  const hashedPassword = await hash(data.password, 10);

  return prisma.user.create({
    data: { ...data, password: hashedPassword }
  });
}
