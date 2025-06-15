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

  public async findById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IUser> {
    const { id } = request.params as { id: string };

    const user = await this.service.findById(id);

    return reply.status(200).send({
      message: 'User found successfully',
      data: user
    });
  }

  public async findAll(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IUser[]> {
    const users = await this.service.findAll();

    return reply.status(200).send({
      message: 'Users retrieved successfully',
      data: users
    });
  }

  public async deleteById(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<void> {
    const { id } = request.params as { id: string };

    await this.service.deleteById(id);

    return reply.status(204).send({ message: 'User deleted successfully' });
  }

  public async update(
    request: FastifyRequest,
    reply: FastifyReply
  ): Promise<IUser> {
    const { id } = request.params as { id: string };
    const { name, email, password } = request.body as Partial<IUser>;

    const user = await this.service.update(id, name, email, password);

    return reply.status(200).send({
      message: 'User updated successfully',
      data: user
    });
  }
}
