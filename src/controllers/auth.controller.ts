import { FastifyReply, FastifyRequest } from 'fastify';
import { authenticateUser, logoutUser } from '../services/auth.service';
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

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  try {
    await logoutUser(reply);

    reply.status(200).send({ message: 'User successfully logged out' });
  } catch (error) {
    throw error;
  }
}
