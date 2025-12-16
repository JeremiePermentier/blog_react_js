import type { IUserBase as User } from "./User.types";

export interface ITagBase {
    name: string;
    author: User;
    createdAt: Date;
    publishedAt: Date;
}