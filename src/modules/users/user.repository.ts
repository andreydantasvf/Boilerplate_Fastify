import { DatabaseConnection } from '@/core/database/connection';
import { PrismaClient } from '@prisma/client';
import { IUser, IUserRepository } from './user.types';

export class UserRepository implements IUserRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  async save({ name, email, password, authProvider }: IUser): Promise<IUser> {
    const userData: IUser = { name, email };
    if (password) {
      userData.password = password;
    }
    if (authProvider) {
      userData.authProvider = authProvider;
    }
    try {
      const user = await this.db.user.create({
        data: userData,
        select: {
          id: true,
          name: true,
          email: true,
          authProvider: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return user;
    } catch (error) {
      throw new Error('Error saving user to database: ' + error);
    }
  }

  async findByEmail(
    email: string,
    returnPassword: boolean = false
  ): Promise<IUser | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { email },
        select: {
          id: true,
          name: true,
          email: true,
          password: returnPassword,
          authProvider: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return user as IUser;
    } catch (error) {
      throw new Error('Error finding user by email: ' + error);
    }
  }

  async findById(id: string): Promise<IUser | null> {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        select: {
          id: true,
          name: true,
          email: true,
          authProvider: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return user;
    } catch (error) {
      throw new Error('Error finding user by ID: ' + error);
    }
  }

  async findAll(): Promise<IUser[]> {
    try {
      const users = await this.db.user.findMany({
        select: {
          id: true,
          name: true,
          email: true,
          authProvider: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return users;
    } catch (error) {
      throw new Error('Error finding all users: ' + error);
    }
  }

  async deleteById(id: string): Promise<void> {
    try {
      await this.db.user.delete({
        where: { id }
      });
    } catch (error) {
      throw new Error('Error deleting user by ID: ' + error);
    }
  }

  async update(user: IUser): Promise<IUser> {
    const { id, name, email, password } = user;
    if (!id) {
      throw new Error('User ID is required for update');
    }
    const userData: Partial<IUser> = { name, email };
    if (password) {
      userData.password = password;
    }

    try {
      const updatedUser = await this.db.user.update({
        where: { id },
        data: userData,
        select: {
          id: true,
          name: true,
          email: true,
          authProvider: true,
          createdAt: true,
          updatedAt: true
        }
      });
      return updatedUser;
    } catch (error) {
      throw new Error('Error updating user: ' + error);
    }
  }
}
