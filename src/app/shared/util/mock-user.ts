import UserResponse, { User } from 'src/app/core/models/user';
import { Comment, CommentResponse, CommentsResponse } from 'src/app/core/models/comment';
import { Author } from 'src/app/core/models/author';
import { Article, ArticlesResponse, ArticleResponse } from 'src/app/core/models/article';
import { Tags, Tag } from 'src/app/core/models/tags';
import ProfileResponse from 'src/app/core/models/profile';

export const mockUser: User = {
    username: 'another',
    email: 'another@email.com',
    token: 'testing',
    bio: 'Just me',
    image: 'none'
};

export const mockAuthor: Author = {
    username: 'another',
    bio: 'Just me',
    image: 'none'
};

export const mockComment: Comment = {
    author: mockAuthor,
    body: 'd',
    id: 234,
    createdAt: new Date().toISOString(),
    slug: 'Hello-World-sdfsdf'
};

export const mockUserResponse: UserResponse = {
    user: {
        ...mockUser
    }
};

export const mockTagList: Tag[] = ['Admin', 'Test'];

export const mockArticle: Article = {
    title: 'test',
    body: 'hello there',
    slug: 'hello-world',
    author: mockAuthor,
    tagList: mockTagList
};

export const mockArticlesResponse: ArticlesResponse = {
    articles: Array(20).fill(mockArticle)
};


export const mockArticleResponse: ArticleResponse = {
    article: mockArticle
};

export const mockCommentResponse: CommentResponse = {
    comment: mockComment
};

export const mockCommentsResponse: CommentsResponse = {
    comments: Array(5).fill(mockComment)
};

export const mockProfileResponse: ProfileResponse = {
    profile: mockUser
};

export const mockToken = 'a string with no meaning';
