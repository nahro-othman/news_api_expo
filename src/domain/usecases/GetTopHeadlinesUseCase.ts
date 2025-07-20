import { NewsRepository } from '../repositories/NewsRepository';
import { NewsResponse } from '../entities/Article';

export class GetTopHeadlinesUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute(country?: string, category?: string): Promise<NewsResponse> {
    return await this.newsRepository.getTopHeadlines(country, category);
  }
} 