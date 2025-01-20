import { FastifyInstance } from 'fastify';
import { loginUser, logout } from '../controllers/auth.controller';

export async function authRoutes(app: FastifyInstance) {
  app.post('/login', loginUser);
  app.post('/logout', logout);
}
