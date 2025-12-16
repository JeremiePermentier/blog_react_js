import type { IUserBase as User } from "./User.types";

export interface ICategoryBase {
    name: string;
    author: User;
    createdAt: Date;
    publishedAt: Date;
}

export interface ICategory extends ICategoryBase {
    _id: string;
}

export interface CategoryData {
    name: string;
}