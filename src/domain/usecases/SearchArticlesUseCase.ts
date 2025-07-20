import { NewsRepository, SearchParams } from '../repositories/NewsRepository';
import { Article } from '../entities/Article';

export class SearchArticlesUseCase {
  constructor(private newsRepository: NewsRepository) {}

  async execute(params: SearchParams): Promise<Article[]> {
    return this.newsRepository.searchArticles(params);
  }
} 