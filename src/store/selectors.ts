import { RootState } from './store';

export const articlesSelector = (state: RootState) => state.articles;
export const funnyFactsSelector = (state: RootState) => state.funnyFacts;
