// import { compare } from 'bcryptjs';
import { generateToken, decodeToken } from '../utils/Auth';
import UserModel from '../database/models/User.model';

export type LoginUser = {
  email: string,
  password: string,
};

export default class UserService {
  public static async login({ email }:LoginUser):Promise<string> {
    const userEmail = await UserModel.findOne({ where: { email } });
    console.log('USER_SERVICE_LOGIN', userEmail);
    return generateToken(userEmail?.email);

    // if (!userEmail) throw new ValidateError('Invalid email or password');

    // const comparePassword = await compare(password, userEmail.password);

    // if (!comparePassword) throw new ValidateError('Invalid email or password');
  }

  public static async getByRole(token:string) {
    const email = decodeToken(token);
    const user = await UserModel.findOne({ where: { email } });
    // console.log('USER_SERVICE_role', user?.role);

    return user?.role;
  }
}
