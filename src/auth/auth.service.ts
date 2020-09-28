import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from './user.repository';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';
import JwtPayloadI from './jwt-service.interface';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserRepository)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    return await this.userRepository.signUp(authCredentialsDTO);
  }

  async signIn(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<{ accessToken: string }> {
    const userName = await this.userRepository.validateUserPassword(
      authCredentialsDTO,
    );

    if (!userName) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload: JwtPayloadI = { userName };

    const accessToken = await this.jwtService.sign(payload);
    return { accessToken };
  }
}
