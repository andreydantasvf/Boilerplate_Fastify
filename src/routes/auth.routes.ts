import { FastifyInstance } from 'fastify';
import { loginUser } from '../controllers/auth.controller';

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', loginUser);
}
