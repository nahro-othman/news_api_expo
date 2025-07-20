import axios, { AxiosInstance } from 'axios';
import { NewsResponse } from '../../domain/entities/Article';
import { API_CONFIG } from '../config/api.config';

export class NewsApiClient {
  private api: AxiosInstance;
  private readonly API_KEY = API_CONFIG.NEWS_API.API_KEY;
  private readonly BASE_URL = API_CONFIG.NEWS_API.BASE_URL;

  constructor() {
    this.api = axios.create({
      baseURL: this.BASE_URL,
      timeout: API_CONFIG.NEWS_API.TIMEOUT,
    });

    // Add request interceptor to include API key
    this.api.interceptors.request.use((config) => {
      config.params = {
        ...config.params,
        apiKey: this.API_KEY,
      };
      return config;
    });

    // Add response interceptor for error handling
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        console.error('API Error:', error.response?.data || error.message);
        throw error;
      }
    );
  }

  async getTopHeadlines(country: string = API_CONFIG.DEFAULT_PARAMS.COUNTRY, category?: string): Promise<NewsResponse> {
    const params: any = { country };
    if (category) {
      params.category = category;
    }

    const response = await this.api.get(API_CONFIG.ENDPOINTS.TOP_HEADLINES, { params });
    return response.data;
  }

  async getEverything(query: string, sortBy: string = API_CONFIG.DEFAULT_PARAMS.SORT_BY): Promise<NewsResponse> {
    const params = {
      q: query,
      sortBy,
    };

    const response = await this.api.get(API_CONFIG.ENDPOINTS.EVERYTHING, { params });
    return response.data;
  }

  async getArticlesByCategory(category: string): Promise<NewsResponse> {
    const params = {
      country: API_CONFIG.DEFAULT_PARAMS.COUNTRY,
      category,
    };

    const response = await this.api.get(API_CONFIG.ENDPOINTS.TOP_HEADLINES, { params });
    return response.data;
  }
} 