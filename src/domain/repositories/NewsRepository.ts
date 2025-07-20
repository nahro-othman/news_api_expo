import { Article, NewsResponse } from '../entities/Article';

export interface NewsRepository {
  getTopHeadlines(country?: string, category?: string): Promise<NewsResponse>;
  getEverything(query: string, sortBy?: string): Promise<NewsResponse>;
  getArticlesByCategory(category: string): Promise<NewsResponse>;
  searchArticles(query: string): Promise<NewsResponse>;
} 