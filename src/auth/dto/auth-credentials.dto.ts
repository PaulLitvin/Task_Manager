import { IsString, Matches, MaxLength, MinLength } from 'class-validator';

export class AuthCredentialsDTO {
  @IsString()
  @MaxLength(20)
  @MinLength(4)
  userName: string;

  @MaxLength(20)
  @MinLength(8)
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'password too weak',
  }) //TODO use this regExp for validation
  password: string;
}
