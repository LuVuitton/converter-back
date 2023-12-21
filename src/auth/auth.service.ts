import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async signIn(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(username);

    if (user?.password !== pass) {
      throw new UnauthorizedException();
    }
    const payload = { userID: user.userID, username: user.username };

    return {
      token: await this.jwtService.signAsync(payload),
      ...user,
    };
  }

  async registration(registerDto: CreateUserDto) {
    const newUser = await this.usersService.createUser(registerDto);
    const token = await this.jwtService.signAsync({
      userID: newUser.userID,
      username: newUser.username,
    });

    return {
      ...newUser,
      token,
    };
  }
  catch(error) {
    console.log('auth service, registration error: ', error);

    throw new Error('Failed to register user');
  }
}
