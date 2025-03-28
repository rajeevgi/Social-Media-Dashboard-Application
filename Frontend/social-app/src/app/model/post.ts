import { User } from "./user";

export class Post {
    _id? : string;
    userId?:User;
    content : string = '';
    likes ?: number;
    likedUsers ?: string[];
    createdAt ?: Date;
}
