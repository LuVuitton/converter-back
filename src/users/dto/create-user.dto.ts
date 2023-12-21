import { IsNotEmpty, Length, Matches } from 'class-validator';

export class CreateUserDto {
  @Length(3, 50)
  @IsNotEmpty()
  username: string;

  @Length(6, 100)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message:
      'Password must contain uppercase and lowercase letters, and must not have newline characters.',
  })
  password: string;
}
