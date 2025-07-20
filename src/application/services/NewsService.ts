import { GetTopHeadlinesUseCase } from '../../domain/usecases/GetTopHeadlinesUseCase';
import { SearchArticlesUseCase } from '../../domain/usecases/SearchArticlesUseCase';
import { NewsResponse } from '../../domain/entities/Article';

export class NewsService {
  constructor(
    private getTopHeadlinesUseCase: GetTopHeadlinesUseCase,
    private searchArticlesUseCase: SearchArticlesUseCase
  ) {}

  async getTopHeadlines(country?: string, category?: string): Promise<NewsResponse> {
    try {
      return await this.getTopHeadlinesUseCase.execute(country, category);
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw error;
    }
  }

  async searchArticles(query: string, sortBy?: string): Promise<NewsResponse> {
    try {
      return await this.searchArticlesUseCase.execute(query, sortBy);
    } catch (error) {
      console.error('Error searching articles:', error);
      throw error;
    }
  }
} 