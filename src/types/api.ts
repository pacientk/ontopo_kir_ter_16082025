export type AIProvider = 'openai' | 'gemini' | 'mock';

export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string | null;
  publishedAt: string;
  source: {
    name: string;
  };
  content: string;
}

export interface NewsApiResponse {
  status: string;
  totalResults: number;
  message?: string;
  code?: string;
  articles: NewsArticle[];
}

export interface FunnyFact {
  funnyFact: string;
  source: string;
  originalLink: string;
  publicationDate: string;
  category: string;
  urlToImage: string | null;
}

export interface OpenAIResponse {
  choices: {
    message: {
      content: string;
    };
  }[];
}
