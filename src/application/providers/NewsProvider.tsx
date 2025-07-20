import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { NewsService } from '../services/NewsService';
import { Article, NewsResponse } from '../../domain/entities/Article';

interface NewsContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  getTopHeadlines: (country?: string, category?: string) => Promise<void>;
  searchArticles: (query: string) => Promise<void>;
  clearError: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
  newsService: NewsService;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children, newsService }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const getTopHeadlines = async (country?: string, category?: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsService.getTopHeadlines(country, category);
      setArticles(response.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const response = await newsService.searchArticles(query);
      setArticles(response.articles);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const clearError = () => {
    setError(null);
  };

  const value: NewsContextType = {
    articles,
    loading,
    error,
    getTopHeadlines,
    searchArticles,
    clearError,
  };

  return <NewsContext.Provider value={value}>{children}</NewsContext.Provider>;
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (context === undefined) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}; 