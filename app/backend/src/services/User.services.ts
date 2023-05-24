import { compare } from 'bcryptjs';
import { generateToken } from '../utils/Auth';
import UserModel from '../database/models/User.model';
import ValidateError from '../utils/ValidateError';

export type LoginUser = {
  email: string,
  password: string,
};

export default class UserService {
  public static async login({ email, password }:LoginUser):Promise<string | undefined> {
    const userEmail = await UserModel.findOne({ where: { email } });
    // const comparePassword = await compare(password, userEmail.password);
    // console.log('TESTE', userEmail);

    // if (userEmail && comparePassword) {
    //   return generateToken(userEmail.id);
    // }

    if (!userEmail) {
      throw new ValidateError('Invalid email');
    }
    const comparePassword = await compare(password, userEmail.password);

    if (!comparePassword) {
      throw new ValidateError('Invalid password');
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
