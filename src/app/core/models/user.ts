export interface User {
    email: string;
    token: string;
    username: string;
    bio?: string;
    image?: string;
}

export default interface UserResponse {
    user: User;
}
