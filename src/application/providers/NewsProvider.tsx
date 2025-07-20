import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Article } from '../../domain/entities/Article';
import { Container } from '../../infrastructure/di/Container';
import { TopHeadlinesParams } from '../../domain/usecases/GetTopHeadlinesUseCase';
import { SearchParams } from '../../domain/repositories/NewsRepository';

interface NewsContextType {
  articles: Article[];
  loading: boolean;
  error: string | null;
  getTopHeadlines: (params: TopHeadlinesParams) => Promise<void>;
  searchArticles: (params: SearchParams) => Promise<void>;
  clearError: () => void;
}

const NewsContext = createContext<NewsContextType | undefined>(undefined);

interface NewsProviderProps {
  children: ReactNode;
}

export const NewsProvider: React.FC<NewsProviderProps> = ({ children }) => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const newsService = Container.getNewsService();

  const clearError = () => {
    setError(null);
  };

  const getTopHeadlines = async (params: TopHeadlinesParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const articles = await newsService.getTopHeadlines(params);
      setArticles(articles);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to fetch news';
      setError(errorMessage);
      console.error('Error fetching top headlines:', err);
    } finally {
      setLoading(false);
    }
  };

  const searchArticles = async (params: SearchParams) => {
    try {
      setLoading(true);
      setError(null);
      
      const articles = await newsService.searchArticles(params);
      setArticles(articles);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to search articles';
      setError(errorMessage);
      console.error('Error searching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  const contextValue: NewsContextType = {
    articles,
    loading,
    error,
    getTopHeadlines,
    searchArticles,
    clearError,
  };

  return (
    <NewsContext.Provider value={contextValue}>
      {children}
    </NewsContext.Provider>
  );
};

export const useNews = (): NewsContextType => {
  const context = useContext(NewsContext);
  if (!context) {
    throw new Error('useNews must be used within a NewsProvider');
  }
  return context;
}; 