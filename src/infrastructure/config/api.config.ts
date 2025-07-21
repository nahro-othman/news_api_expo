import Constants from 'expo-constants';

export const API_CONFIG = {
  NEWS_API: {
    BASE_URL: 'https://newsapi.org/v2',
    API_KEY: Constants.expoConfig?.extra?.newsApiKey || '',
    TIMEOUT: 10000,
  },
  ENDPOINTS: {
    TOP_HEADLINES: '/top-headlines',
    EVERYTHING: '/everything',
  },
  DEFAULT_PARAMS: {
    COUNTRY: 'us',
    SORT_BY: 'publishedAt',
  },
}; 