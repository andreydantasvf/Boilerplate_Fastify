import { FastifyInstance } from 'fastify';
import {
  createUserHandler,
  getAllUsersHandler
} from '../controllers/user.controller';

export async function userRoutes(app: FastifyInstance) {
  app.post('/', createUserHandler);
  app.get('/', { preHandler: app.authenticate }, getAllUsersHandler);
}
