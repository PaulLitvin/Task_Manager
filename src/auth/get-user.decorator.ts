import { createParamDecorator } from '@nestjs/common';
import { User } from './user.entity';

export const GetUser = createParamDecorator(
  (data, req): User => {
    // TODO Find out whi req has too many nested levels
    return req.args[0].user;
  },
);
