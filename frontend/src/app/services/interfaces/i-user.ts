export enum UserRole {
    ADMIN = 'admin',
    USER = 'user',
}

export interface IUser {
    id: number;
    username: string;
    email: string;
    password: string;
    role: UserRole;
    birthday: Date;
    createdAt: Date;
    updatedAt: Date;
}