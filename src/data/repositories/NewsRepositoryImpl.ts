import { NewsRepository } from '../../domain/repositories/NewsRepository';
import { NewsResponse } from '../../domain/entities/Article';
import { NewsApiClient } from '../../infrastructure/api/NewsApiClient';

export class NewsRepositoryImpl implements NewsRepository {
  constructor(private apiClient: NewsApiClient) {}

  async getTopHeadlines(country?: string, category?: string): Promise<NewsResponse> {
    return await this.apiClient.getTopHeadlines(country || 'us', category);
  }

  async getEverything(query: string, sortBy?: string): Promise<NewsResponse> {
    return await this.apiClient.getEverything(query, sortBy);
  }

  async getArticlesByCategory(category: string): Promise<NewsResponse> {
    return await this.apiClient.getArticlesByCategory(category);
  }

  async searchArticles(query: string): Promise<NewsResponse> {
    return await this.apiClient.getEverything(query);
  }
} 