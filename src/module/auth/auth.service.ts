import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { NotFoundErr } from 'src/common/exceptions/notFoundException.exception';
import { UserRepository } from '../user/repository/user.repository';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
export interface LoginResponse {
  message: string;
  token?: string;
  status: number;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepo: UserRepository,
    private readonly jwtService: JwtService,
  ) {}

  async login(LoginDto: LoginDto): Promise<LoginResponse> {
    console.log(LoginDto);
    const existingUser = await this.userRepo.getWithAsync({
      relations: ['role'],
      email: LoginDto.email,
    });
    if (existingUser.length === 0) {
      throw new NotFoundErr('User Does Not Registered yet!!!');
      // return { message: 'User Does not Exist', status: 404 };
    } else {
      const password = LoginDto.password;
      const match = await bcrypt.compare(password, existingUser[0].password);

      if (match) {
        let token = await this.jwtService.signAsync({
          email: LoginDto.email,
          role: existingUser[0].role.id,
        });
        return { status: 200, message: 'Login Successfull', token: token };
      } else {
        // return { message: 'Invalid Email or Password', status: 404 };
        throw new NotFoundErr('Invalid Credentials Please Try again !!!');
      }
    }
  }
}
