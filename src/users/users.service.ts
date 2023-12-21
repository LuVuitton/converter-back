import {
  ConflictException,
  ForbiddenException,
  Inject,
  Injectable,

} from '@nestjs/common';
import { Users } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';

export type User = any;

@Injectable()
export class UsersService {
  constructor(
    @Inject('USERS_REPOSITORY')
    private usersRepository: Repository<Users>,
  ) {}

  async findOne(username: string): Promise<User | undefined> {
    return await this.usersRepository.findOne({ where: { username: username } });
  }

  async createUser(createUserDto: CreateUserDto) {
    let isUsernameExist;
    try {
      isUsernameExist = await this.usersRepository.findOne({
        where: { username: createUserDto.username },
      });
      if (isUsernameExist) {
        throw new ConflictException('user name already exists');
      }
      const newUser = await this.usersRepository.save({
        username: createUserDto.username,
        password: createUserDto.password,
      });

      return {
        userID: newUser.userID,
        username: newUser.username,
        userRegistrationDate: newUser.userRegistrationDate,
      };
    } catch (err) {
      if (isUsernameExist) {
        throw new ConflictException('user name already exists');
      }
      throw new ForbiddenException(`registration error: ${err}`);
    }
  }
}
