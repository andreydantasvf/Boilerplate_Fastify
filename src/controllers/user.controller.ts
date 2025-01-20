import { FastifyReply, FastifyRequest } from 'fastify';
import { createUserSchema } from '../schemas/user.schema';
import { createUser, getAllUsers } from '../services/user.service';

export async function createUserHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const body = createUserSchema.parse(req.body);
    const user = await createUser(body);
    reply.code(201).send(user);
  } catch (error) {
    throw error;
  }
}

export async function getAllUsersHandler(
  req: FastifyRequest,
  reply: FastifyReply
) {
  try {
    const users = await getAllUsers();
    reply.send(users);
  } catch (error) {
    throw error;
  }
}
