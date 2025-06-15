import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { AuthController } from './auth.controller';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { loginSchema } from './auth.schema';

export class AuthRoutes {
  public prefix_route = '/auth';
  private controller: AuthController;

  constructor() {
    this.controller = new AuthController();
  }

  public routes = async (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions
  ) => {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/login',
      {
        schema: {
          body: loginSchema
        }
      },
      (request, reply) => this.controller.login(request, reply)
    );

    fastifyWithZod.post('/refresh', {}, (request, reply) =>
      this.controller.refreshToken(request, reply)
    );

    fastifyWithZod.post('/logout', {}, (request, reply) =>
      this.controller.logout(request, reply)
    );

    fastifyWithZod.get(
      '/me',
      { preHandler: [fastify.authenticate] },
      (request, reply) => this.controller.getMe(request, reply)
    );
  };
}
