import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const userName = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!userName) {
      throw new UnauthorizedException('Invalid credentials');
    }
  }
}
