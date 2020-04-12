import { Tag } from './tags';
import { Author } from './author';

export interface Article {
    tagList: Tag[];
    createdAt?: string;
    author: Author;
    description?: string;
    title: string;
    body: string;
    favoritesCount?: number;
    slug?: string;
    updatedAt?: string;
    favorited?: boolean;
}

export interface ArticleResponse {
    article: Article;
}

export interface ArticlesResponse {
    articles: Article[];
}
