import { FastifyInstance, FastifyPluginOptions } from 'fastify';
import { ZodTypeProvider } from 'fastify-type-provider-zod';
import {
  createUserSchema,
  updateUserSchema,
  userIdSchema
} from './user.schema';
import { UserController } from './user.controller';

export class UserRoutes {
  public prefix_route = '/users';
  private controller: UserController;

  constructor() {
    this.controller = new UserController();
  }

  public routes = async (
    fastify: FastifyInstance,
    _options: FastifyPluginOptions
  ) => {
    const fastifyWithZod = fastify.withTypeProvider<ZodTypeProvider>();

    fastifyWithZod.post(
      '/',
      {
        schema: {
          body: createUserSchema
        }
      },
      (request, reply) => this.controller.create(request, reply)
    );

    fastifyWithZod.get(
      '/:id',
      {
        schema: {
          params: userIdSchema
        }
      },
      (request, reply) => this.controller.findById(request, reply)
    );

    fastifyWithZod.get('/', {}, (request, reply) =>
      this.controller.findAll(request, reply)
    );

    fastifyWithZod.delete(
      '/:id',
      {
        preHandler: [fastify.authenticate],
        schema: {
          params: userIdSchema
        }
      },
      (request, reply) => this.controller.deleteById(request, reply)
    );

    fastifyWithZod.put(
      '/:id',
      {
        preHandler: [fastify.authenticate],
        schema: {
          params: userIdSchema,
          body: updateUserSchema
        }
      },
      (request, reply) => this.controller.update(request, reply)
    );
  };
}
