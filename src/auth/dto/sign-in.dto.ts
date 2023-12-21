import { IsNotEmpty } from '@nestjs/class-validator';
export class SignInAuthDto {
  @IsNotEmpty()
  username: string;

  @IsNotEmpty()
  password: string;
}
