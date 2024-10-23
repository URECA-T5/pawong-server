import { User as UserModel } from '../src/entity/User';

declare global {
  namespace Express {
    export interface User extends UserModel {}
  }
}
