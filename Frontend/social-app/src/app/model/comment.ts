export class Comment {
    _id?: string;
    userId?: {
      _id: string;
      username: string;
    };
    postId !: string;
    content !: string;
    likes !: number;
    likedUsers !: string[]; // Users who liked the comment
    createdAt !: Date;
  }
  