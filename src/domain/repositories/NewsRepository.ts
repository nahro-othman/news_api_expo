import { Article, NewsResponse } from '../entities/Article';
import { TopHeadlinesParams } from '../usecases/GetTopHeadlinesUseCase';

export interface SearchParams {
  q: string;
  sources?: string;
  from?: string;
  to?: string;
  sortBy?: 'relevancy' | 'popularity' | 'publishedAt';
  pageSize?: number;
  page?: number;
}

export interface NewsRepository {
  getTopHeadlines(params: TopHeadlinesParams): Promise<Article[]>;
  searchArticles(params: SearchParams): Promise<Article[]>;
} 