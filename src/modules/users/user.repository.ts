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
}
