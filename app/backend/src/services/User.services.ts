import { compare } from 'bcryptjs';
import { generateToken } from '../utils/Auth';
import UserModel from '../database/models/User.model';
import ValidateError from '../utils/ValidateError';

export type LoginUser = {
  email: string,
  password: string,
};

export default class UserService {
  public static async login({ email, password }:LoginUser):Promise<string> {
    const userEmail = await UserModel.findOne({ where: { email } });

    if (!userEmail) {
      throw new ValidateError('Invalid email or pahrssword');
    }
    const comparePassword = await compare(password, userEmail.password);

    if (!comparePassword) {
      throw new ValidateError('Invalid email or pahrssword');
    }
    return generateToken(userEmail.id);
  }

  public static async getByRole(id: number) {
    const user = await UserModel.findOne({ where: { id } });

    if (!user) {
      throw new ValidateError('Token must be a valid token');
    }
    return user.role;
  }
}
