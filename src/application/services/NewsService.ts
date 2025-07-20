import { GetTopHeadlinesUseCase, TopHeadlinesParams } from '../../domain/usecases/GetTopHeadlinesUseCase';
import { SearchArticlesUseCase } from '../../domain/usecases/SearchArticlesUseCase';
import { SearchParams } from '../../domain/repositories/NewsRepository';
import { Article } from '../../domain/entities/Article';

export class NewsService {
  constructor(
    private getTopHeadlinesUseCase: GetTopHeadlinesUseCase,
    private searchArticlesUseCase: SearchArticlesUseCase
  ) {}

  async getTopHeadlines(params: TopHeadlinesParams): Promise<Article[]> {
    return await this.getTopHeadlinesUseCase.execute(params);
  }

  async searchArticles(params: SearchParams): Promise<Article[]> {
    return await this.searchArticlesUseCase.execute(params);
  }

  // Helper method to create date filters
  createDateFilter(dateRange: string): { from?: string; to?: string } {
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    
    switch (dateRange) {
      case 'today':
        return { from: today.toISOString() };
      case 'yesterday':
        const yesterday = new Date(today);
        yesterday.setDate(yesterday.getDate() - 1);
        return { 
          from: yesterday.toISOString(),
          to: today.toISOString()
        };
      case 'week':
        const weekAgo = new Date(today);
        weekAgo.setDate(weekAgo.getDate() - 7);
        return { from: weekAgo.toISOString() };
      case 'month':
        const monthAgo = new Date(today);
        monthAgo.setMonth(monthAgo.getMonth() - 1);
        return { from: monthAgo.toISOString() };
      default:
        return {};
    }
  }
} 