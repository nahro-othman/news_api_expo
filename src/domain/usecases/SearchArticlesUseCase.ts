import { NewsRepository } from '../repositories/NewsRepository';
import { NewsResponse } from '../entities/Article';

export class SearchArticlesUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute(query: string, sortBy?: string): Promise<NewsResponse> {
    return await this.newsRepository.getEverything(query, sortBy);
  }
} 