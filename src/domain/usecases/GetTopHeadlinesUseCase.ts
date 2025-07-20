import { NewsRepository } from '../repositories/NewsRepository';
import { Article } from '../entities/Article';

export interface TopHeadlinesParams {
  country?: string;
  category?: string;
  source?: string;
  from?: string;
  to?: string;
  pageSize?: number;
  page?: number;
}

export class GetTopHeadlinesUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute(params: TopHeadlinesParams): Promise<Article[]> {
    return this.newsRepository.getTopHeadlines(params);
  }
} 