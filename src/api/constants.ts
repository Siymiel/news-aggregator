const NEWS_API_KEY = import.meta.env.VITE_APP_NEWS_API_KEY;
const GUARDIAN_API_KEY = import.meta.env.VITE_APP_GUARDIAN_API_KEY;
const NYT_API_KEY = import.meta.env.VITE_NYT_API_KEY;

export const NEWS_API_URL = `https://newsapi.org/v2/top-headlines?apiKey=${NEWS_API_KEY}&pageSize=10`;
export const GUARDIAN_API_URL = `https://content.guardianapis.com/search?api-key=${GUARDIAN_API_KEY}&page-size=10`;
export const NYT_API_URL = `https://api.nytimes.com/svc/search/v2/articlesearch.json?api-key=${NYT_API_KEY}`;