// import { compare } from 'bcryptjs';
import { generateToken } from '../utils/Auth';
import UserModel from '../database/models/User.model';

export type LoginUser = {
  email: string,
  password: string,
};

export default class UserService {
  public static async login({ email }:LoginUser):Promise<string> {
    const userEmail = await UserModel.findOne({ where: { email } });
    return generateToken(userEmail?.email);

    // if (!userEmail) throw new ValidateError('Invalid email or password');

    // const comparePassword = await compare(password, userEmail.password);

    // if (!comparePassword) throw new ValidateError('Invalid email or password');
  }

  public static async getByRole(id: number) {
    const user = await UserModel.findOne({ where: { id } });

    return user?.role;
  }
}
