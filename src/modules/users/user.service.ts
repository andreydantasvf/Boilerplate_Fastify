import { PasswordHash } from '@/shared/hash/password-hash';
import { UserRepository } from './user.repository';
import { IUserRepository } from './user.types';

export class UserService {
  private repository: IUserRepository;

  constructor() {
    this.repository = new UserRepository();
  }

  public async create(name: string, email: string, password: string) {
    const hashPassword = await PasswordHash.hash(password);
    const user = await this.repository.save({
      name,
      email,
      password: hashPassword
    });
    return user;
  }
}
