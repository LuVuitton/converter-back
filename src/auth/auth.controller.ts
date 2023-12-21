import {
  Controller,
  Post,
  Body,
  HttpCode,
  HttpStatus,
  UseGuards,
  Get,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInAuthDto } from './dto/sign-in.dto';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInAuthDto) {    
    return this.authService.signIn(signInDto.username, signInDto.password);
  }

  @Post('registration')
  registration(@Body() registerDto: CreateUserDto) {
    return this.authService.registration(registerDto);
  }

  @UseGuards(AuthGuard)
  @Get('me')
  getProfile(@Request() req) {
    return {
      userID: req.user.userID,
      username: req.user.username,
      userRegistrationDate: req.user.userRegistrationDate,
    };
  }
}
