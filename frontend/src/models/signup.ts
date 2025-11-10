import type Login from "./login";

export enum Role {
  User = 'user',
  Admin = 'admin',
}

export default interface Signup extends Login{
    firstName: string,
    lastName: string
   
}