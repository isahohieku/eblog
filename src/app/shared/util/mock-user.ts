import UserResponse, { User } from 'src/app/core/models/user';
import { Comment } from 'src/app/core/models/comment';
import { Author } from 'src/app/core/models/author';


export const mockUser: User = {
    username: 'another',
    email: 'another@email.com',
    token: 'testing',
    bio: 'Just me',
    image: 'none'
};

export const mockAuthor: Author = {
    username: 'a',
    bio: '',
    image: ''
};

export const mockComment: Comment = {
    author: mockAuthor,
    body: 'd',
    id: 234,
    createdAt: new Date().toISOString(),
    slug: 'Hello-World-sdfsdf'
};

export const mockUserRespone: UserResponse = {
    user: {
        ...mockUser
    }
};
