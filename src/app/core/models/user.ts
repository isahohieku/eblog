export interface User {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
    following?: boolean;
}

export default interface UserResponse {
    user: User;
}
