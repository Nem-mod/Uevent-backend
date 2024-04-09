import { FullUserDto } from '../dto/full-user.dto';

declare global {
  namespace Express {
    interface User extends FullUserDto {}
  }
}
