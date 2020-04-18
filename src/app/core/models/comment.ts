import { Author } from './author';

export interface Comment {
    createdAt?: string;
    slug?: string;
    author: Author;
    id: number;
    body: string;
    updatedAt?: string;
}

export interface CommentsResponse {
    comments: Comment[];
}

export interface CommentResponse {
    comment: Comment;
}
