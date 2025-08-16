import { NewsArticle, FunnyFact } from './api';

export interface ArticlesState {
  items: NewsArticle[];
  loading: boolean;
  error: string | null;
}

export interface FunnyFactsState {
  items: FunnyFact[];
  loading: boolean;
  error: string | null;
}

export interface RootState {
  articles: ArticlesState;
  funnyFacts: FunnyFactsState;
}
