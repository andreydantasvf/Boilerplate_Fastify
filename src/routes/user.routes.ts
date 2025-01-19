import { FastifyInstance } from 'fastify';
import { createUserHandler } from '../controllers/user.controller';

export async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserHandler);
}
