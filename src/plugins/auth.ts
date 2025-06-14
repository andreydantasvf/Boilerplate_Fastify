import { FastifyInstance, FastifyRequest, FastifyReply } from 'fastify';
import fastifyJWT from '@fastify/jwt';
import fastifyCookie from '@fastify/cookie';
import fp from 'fastify-plugin';
import { env } from '../config';

interface UserPayload {
  id: string;
  email: string;
  name: string;
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    payload: UserPayload;
    user: UserPayload;
  }
}

declare module 'fastify' {
  interface FastifyInstance {
    // disable eslint-disable-next-line no-unused-vars
    authenticate: (
      request: FastifyRequest, //eslint-disable-line no-unused-vars
      reply: FastifyReply //eslint-disable-line no-unused-vars
    ) => Promise<void>;
  }
}

export default fp(async (fastify: FastifyInstance) => {
  fastify.register(fastifyJWT, {
    secret: env.JWT_SECRET,
    cookie: { cookieName: 'access_token', signed: false }
  });

  fastify.register(fastifyCookie, {
    secret: env.COOKIE_SECRET,
    parseOptions: {
      httpOnly: true,
      secure: env.NODE_ENV === 'production'
    }
  });

  fastify.decorate(
    'authenticate',
    async (request: FastifyRequest, reply: FastifyReply) => {
      try {
        // Verificando o token
        const user = await request.jwtVerify<UserPayload>();
        request.user = user; // Armazenando os dados do usuário
      } catch (err) {
        // Caso o token seja inválido ou ausente, retornando status 401
        reply.status(401).send({ error: 'Invalid or missing token' });
        throw err;
      }
    }
  );
});
