import { Repository, EntityRepository } from 'typeorm';
import {
  ConflictException,
  InternalServerErrorException,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { User } from './user.entity';
import { AuthCredentialsDTO } from './dto/auth-credentials.dto';

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async signUp(authCredentialsDTO: AuthCredentialsDTO): Promise<void> {
    const { userName, password } = authCredentialsDTO;

    // create hash password with salt

    const user = new User();
    user.userName = userName;
    user.salt = await bcrypt.genSalt();
    user.password = await this.hashPassword(password, user.salt);

    /**
     * .save() method in typeorm save users to DB and create table in DB
     */

    try {
      await user.save();
    } catch (e) {
      /**
       *
       * check for userName duplication
       */
      if (e.code === '23505') {
        throw new ConflictException('UserName already exist');
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async validateUserPassword(
    authCredentialsDTO: AuthCredentialsDTO,
  ): Promise<string | null> {
    const { password, userName } = authCredentialsDTO;

    const user = await this.findOne({ userName });

    if (user && (await user.validatePassword(password))) {
      return user.userName;
    } else {
      return null;
    }
  }

  private async hashPassword(password: string, salt: string): Promise<string> {
    return bcrypt.hash(password, salt);
  }
}
