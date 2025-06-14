export interface IUser {
  id?: string;
  name: string;
  email: string;
  password?: string;
  authProvider?: string;
  createdAt?: Date;
  updatedAt?: Date;
}

export interface IUserRepository {
  save(user: IUser): Promise<IUser>;
}
