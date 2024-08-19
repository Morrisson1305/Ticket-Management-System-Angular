import { UserType } from "./user-type";

export interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  type: UserType;
  score: number;
  createdTime: string;

}
