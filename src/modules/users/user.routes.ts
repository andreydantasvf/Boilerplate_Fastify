import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import { createUserSchema } from './user.schema';
import { UserController } from './user.controller';

export class UserRoutes {
  public prefix_route = '/users';
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
  }

  public async routes(
    fastify: FastifyInstance,
    _options: FastifyPluginOptions
  ) {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/',
      {
        schema: {
          body: createUserSchema
        }
      },
      this.controller.create
    );
  }
}
