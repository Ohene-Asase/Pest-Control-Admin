import { AuditFields } from "../shared/models";

export interface User {
    id: string
    username: string
    name: string
    email: string
    phoneNumber: string
    token: string
    picture: string
    role: Role
}

export interface Role extends AuditFields {
    name: string
    privileges: string[] | string
}


export interface LoginParams {
    username: string;
    password: string;
    type: string;
}

export class UserTypes {
    static get Manager() { return "Manager" }
    static get Member() { return "Member" }
}

export interface LoginResponse {
    username: string;
    token: string;
    view: string;
}
