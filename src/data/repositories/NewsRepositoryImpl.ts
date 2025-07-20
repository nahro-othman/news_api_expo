import { NewsRepository, SearchParams } from '../../domain/repositories/NewsRepository';
import { Article, NewsResponse } from '../../domain/entities/Article';
import { TopHeadlinesParams } from '../../domain/usecases/GetTopHeadlinesUseCase';
import { NewsApiClient } from '../../infrastructure/api/NewsApiClient';

export class NewsRepositoryImpl implements NewsRepository {
  constructor(private newsApiClient: NewsApiClient) {}

  async getTopHeadlines(params: TopHeadlinesParams): Promise<Article[]> {
    const queryParams: Record<string, string> = {};
    
    if (params.country) queryParams.country = params.country;
    if (params.category) queryParams.category = params.category;
    if (params.source) queryParams.sources = params.source;
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.pageSize) queryParams.pageSize = params.pageSize.toString();
    if (params.page) queryParams.page = params.page.toString();

    const response = await this.newsApiClient.getTopHeadlines(queryParams);
    return response.articles || [];
  }

  async searchArticles(params: SearchParams): Promise<Article[]> {
    const queryParams: Record<string, string> = {
      q: params.q,
    };
    
    if (params.sources) queryParams.sources = params.sources;
    if (params.from) queryParams.from = params.from;
    if (params.to) queryParams.to = params.to;
    if (params.sortBy) queryParams.sortBy = params.sortBy;
    if (params.pageSize) queryParams.pageSize = params.pageSize.toString();
    if (params.page) queryParams.page = params.page.toString();

    const response = await this.newsApiClient.searchEverything(queryParams);
    return response.articles || [];
  }
} 