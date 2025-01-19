import { hash } from 'bcrypt';
import { prisma } from '../plugins/prisma';

export async function createUser(data: {
  name: string;
  email: string;
  password: string;
}) {
  const hashedPassword = await hash(data.password, 10);
  return prisma.user.create({
    data: { ...data, password: hashedPassword }
  });
}
