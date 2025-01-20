import { FastifyReply, FastifyRequest } from 'fastify';
import { authenticateUser } from '../services/auth.service';
import { env } from '../config';
import { createAuthSchema } from '../schemas/auth.schema';

export async function loginUser(req: FastifyRequest, reply: FastifyReply) {
  const { email, password } = createAuthSchema.parse(req.body);

  try {
    const user = await authenticateUser({ email, password });

    const token = await reply.jwtSign(user, { expiresIn: '1h' });

    reply
      .setCookie('access_token', token, {
        httpOnly: true,
        secure: env.NODE_ENV === 'production',
        maxAge: 3600,
        path: '/'
      })
      .send({ message: 'Login successful' });
  } catch (error) {
    reply.clearCookie('access_token');
    throw error;
  }
}
