import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Article } from '../../domain/entities/Article';

interface BookmarkContextType {
  bookmarks: Article[];
  isBookmarked: (article: Article) => boolean;
  addBookmark: (article: Article) => Promise<void>;
  removeBookmark: (article: Article) => Promise<void>;
  toggleBookmark: (article: Article) => Promise<void>;
  clearAllBookmarks: () => Promise<void>;
  loading: boolean;
}

const BookmarkContext = createContext<BookmarkContextType | undefined>(undefined);

const BOOKMARKS_STORAGE_KEY = '@news_app_bookmarks';

interface BookmarkProviderProps {
  children: ReactNode;
}

export const BookmarkProvider: React.FC<BookmarkProviderProps> = ({ children }) => {
  const [bookmarks, setBookmarks] = useState<Article[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadBookmarks();
  }, []);

  const loadBookmarks = async () => {
    try {
      const storedBookmarks = await AsyncStorage.getItem(BOOKMARKS_STORAGE_KEY);
      if (storedBookmarks) {
        const parsedBookmarks = JSON.parse(storedBookmarks);
        setBookmarks(parsedBookmarks);
      }
    } catch (error) {
      console.error('Error loading bookmarks:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveBookmarks = async (newBookmarks: Article[]) => {
    try {
      await AsyncStorage.setItem(BOOKMARKS_STORAGE_KEY, JSON.stringify(newBookmarks));
    } catch (error) {
      console.error('Error saving bookmarks:', error);
    }
  };

  const isBookmarked = (article: Article): boolean => {
    return bookmarks.some(bookmark => bookmark.url === article.url);
  };

  const addBookmark = async (article: Article) => {
    if (!isBookmarked(article)) {
      const newBookmarks = [...bookmarks, { ...article, bookmarkedAt: new Date().toISOString() }];
      setBookmarks(newBookmarks);
      await saveBookmarks(newBookmarks);
    }
  };

  const removeBookmark = async (article: Article) => {
    const newBookmarks = bookmarks.filter(bookmark => bookmark.url !== article.url);
    setBookmarks(newBookmarks);
    await saveBookmarks(newBookmarks);
  };

  const toggleBookmark = async (article: Article) => {
    if (isBookmarked(article)) {
      await removeBookmark(article);
    } else {
      await addBookmark(article);
    }
  };

  const clearAllBookmarks = async () => {
    setBookmarks([]);
    await saveBookmarks([]);
  };

  const contextValue: BookmarkContextType = {
    bookmarks,
    isBookmarked,
    addBookmark,
    removeBookmark,
    toggleBookmark,
    clearAllBookmarks,
    loading,
  };

  return (
    <BookmarkContext.Provider value={contextValue}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = (): BookmarkContextType => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error('useBookmarks must be used within a BookmarkProvider');
  }
  return context;
}; 