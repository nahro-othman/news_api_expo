export const API_CONFIG = {
  NEWS_API: {
    BASE_URL: 'https://newsapi.org/v2',
    API_KEY: '5695c0512a42489e94c94d59665b97fc', // Replace with your actual API key
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