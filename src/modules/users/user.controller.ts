import { FastifyReply, FastifyRequest } from 'fastify';
import { UserService } from './user.service';
import { IUser } from './user.types';
import { CreateUserInput } from './user.schema';

export class UserController {
  private service: UserService;

  constructor() {
    this.service = new UserService();
  }

  public async create(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IUser> {
    const { name, email, password } = request.body as CreateUserInput;

    const user = await this.service.create(name, email, password);

    return reply.status(201).send({
      message: 'User created successfully',
      data: user
    });
  }
}
