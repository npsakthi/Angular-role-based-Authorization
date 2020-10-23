import { Role } from "./role";

export class User {
    id: number;
    firstName: string;
    lastName: string;
    username: string;
    role: Role;
    loginTime: Date;
    logoutTime: Date;
    clientIP: string;
    token?: string;
}