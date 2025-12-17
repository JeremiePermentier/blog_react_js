import type { IUserBase as User } from "./User.types";

export interface ITagBase {
    name: string;
    author: User;
    createdAt: Date;
    publishedAt: Date;
}

export interface ITag extends ITagBase {
    _id: string;
}

export interface TagData {
    name: string;
}