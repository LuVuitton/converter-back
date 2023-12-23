import { IsNotEmpty, IsNumber, IsPositive, MaxLength } from 'class-validator';

export class CreateHistoryDto {
  @MaxLength(5, {
    message: 'First currency string should be at most 5 characters',
  })
  @IsNotEmpty({ message: 'First currency string should not be empty' })
  firstСurrencyst: string;

  @MaxLength(5, {
    message: 'Second currency string should be at most 5 characters',
  })
  @IsNotEmpty({ message: 'Second currency string should not be empty' })
  secondСurrencyst: string;

  @IsNumber({}, { message: 'First value should be a number' })
  @IsNotEmpty({ message: 'First value should not be empty' })
  @IsPositive({ message: 'First value should be a positive number' })
  firstValue: number;

  @IsNumber({}, { message: 'Second value should be a number' })
  @IsNotEmpty({ message: 'Second value should not be empty' })
  @IsPositive({ message: 'Second value should be a positive number' })
  secondValue: number;
}
