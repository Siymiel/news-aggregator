export interface ArticleInterface {
    title: string;
    description: string;
    url: string;
    source: string;
    category: string;
    author: string;
    publishedAt: string;
  }
  
  export interface NewsState {
    articles: ArticleInterface[];
    query: string;
    category: string;
    selectedSources: string[];
    author: string | null;
    loading: boolean;
    error: string | null;
    date: string;
    manualCategory: boolean;
    manualAuthor: boolean;
    manualSource: boolean;
  }