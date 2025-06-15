import { DatabaseConnection } from '@/core/database/connection';
import { PrismaClient } from '@prisma/client';
import { IRefreshToken, IAuthRepository } from './auth.types';

export class AuthRepository implements IAuthRepository {
  private db: PrismaClient;

  constructor() {
    this.db = DatabaseConnection.getInstance().getClient();
  }

  public async save({
    hashedToken,
    userId,
    revoked
  }: Omit<IRefreshToken, 'id'>): Promise<IRefreshToken> {
    try {
      const refreshToken = await this.db.refreshToken.create({
        data: {
          hashedToken,
          userId,
          revoked
        },
        select: {
          id: true,
          hashedToken: true,
          userId: true,
          revoked: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return refreshToken;
    } catch (error) {
      throw new Error('Error saving refresh token to database: ' + error);
    }
  }

  public async findByHashedToken(
    hashedToken: string
  ): Promise<IRefreshToken | null> {
    try {
      const refreshToken = await this.db.refreshToken.findUnique({
        where: { hashedToken },
        select: {
          id: true,
          hashedToken: true,
          userId: true,
          revoked: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return refreshToken;
    } catch (error) {
      throw new Error('Error finding refresh token by hashed token: ' + error);
    }
  }

  public async revokeAllTokensByUserId(userId: string): Promise<void> {
    try {
      await this.db.refreshToken.updateMany({
        where: { userId },
        data: { revoked: true }
      });
    } catch (error) {
      throw new Error('Error revoking refresh tokens for user: ' + error);
    }
  }

  public async update(id: string, revoked: boolean): Promise<IRefreshToken> {
    try {
      const updatedToken = await this.db.refreshToken.update({
        where: { id },
        data: { revoked },
        select: {
          id: true,
          hashedToken: true,
          userId: true,
          revoked: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return updatedToken;
    } catch (error) {
      throw new Error('Error updating refresh token by hashed token: ' + error);
    }
  }

  public async updateByHashedToken(
    hashedToken: string,
    revoked: boolean
  ): Promise<IRefreshToken> {
    try {
      const updatedToken = await this.db.refreshToken.update({
        where: { hashedToken },
        data: { revoked },
        select: {
          id: true,
          hashedToken: true,
          userId: true,
          revoked: true,
          createdAt: true,
          updatedAt: true
        }
      });

      return updatedToken;
    } catch (error) {
      throw new Error('Error updating refresh token by hashed token: ' + error);
    }
  }
}
