import { NewsApiClient } from '../api/NewsApiClient';
import { NewsRepositoryImpl } from '../../data/repositories/NewsRepositoryImpl';
import { GetTopHeadlinesUseCase } from '../../domain/usecases/GetTopHeadlinesUseCase';
import { SearchArticlesUseCase } from '../../domain/usecases/SearchArticlesUseCase';
import { NewsService } from '../../application/services/NewsService';

export class Container {
  private static instance: Container;
  private newsApiClient: NewsApiClient;
  private newsRepository: NewsRepositoryImpl;
  private getTopHeadlinesUseCase: GetTopHeadlinesUseCase;
  private searchArticlesUseCase: SearchArticlesUseCase;
  private newsService: NewsService;

  private constructor() {
    this.initializeDependencies();
  }

  public static getInstance(): Container {
    if (!Container.instance) {
      Container.instance = new Container();
    }
    return Container.instance;
  }

  private initializeDependencies(): void {
    // Infrastructure Layer
    this.newsApiClient = new NewsApiClient();

    // Data Layer
    this.newsRepository = new NewsRepositoryImpl(this.newsApiClient);

    // Domain Layer (Use Cases)
    this.getTopHeadlinesUseCase = new GetTopHeadlinesUseCase(this.newsRepository);
    this.searchArticlesUseCase = new SearchArticlesUseCase(this.newsRepository);

    // Application Layer
    this.newsService = new NewsService(
      this.getTopHeadlinesUseCase,
      this.searchArticlesUseCase
    );
  }

  public getNewsService(): NewsService {
    return this.newsService;
  }

  public getNewsRepository(): NewsRepositoryImpl {
    return this.newsRepository;
  }
} 