import axios, { AxiosInstance } from 'axios';
import { NewsResponse } from '../../domain/entities/Article';
import { API_CONFIG } from '../config/api.config';

export class NewsApiClient {
  private client: AxiosInstance;

  constructor() {
    this.client = axios.create({
      baseURL: API_CONFIG.NEWS_API.BASE_URL,
      timeout: API_CONFIG.NEWS_API.TIMEOUT,
      headers: {
        'X-Api-Key': API_CONFIG.NEWS_API.API_KEY,
        'Content-Type': 'application/json',
      },
    });
  }

  async getTopHeadlines(params: Record<string, string> = {}): Promise<NewsResponse> {
    try {
      const defaultParams = {
        country: API_CONFIG.DEFAULT_PARAMS.COUNTRY,
        pageSize: '20',
      };

      const queryParams = { ...defaultParams, ...params };
      
      const response = await this.client.get(API_CONFIG.ENDPOINTS.TOP_HEADLINES, {
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      console.error('Error fetching top headlines:', error);
      throw new Error('Failed to fetch top headlines');
    }
  }

  async searchEverything(params: Record<string, string>): Promise<NewsResponse> {
    try {
      const defaultParams = {
        sortBy: API_CONFIG.DEFAULT_PARAMS.SORT_BY,
        pageSize: '20',
      };

      const queryParams = { ...defaultParams, ...params };
      
      const response = await this.client.get(API_CONFIG.ENDPOINTS.EVERYTHING, {
        params: queryParams,
      });

      return response.data;
    } catch (error) {
      console.error('Error searching articles:', error);
      throw new Error('Failed to search articles');
    }
  }
} 