import { createAsyncThunk } from '@reduxjs/toolkit';
import { newsApi } from '../../services';
import { ARTICLES_COUNT } from '../../utils';

export const fetchArticles = createAsyncThunk(
  'articles/fetchArticles',
  async (_, { rejectWithValue }) => {
    try {
      const response = await newsApi.getTopHeadlines();
      return response.articles.slice(0, ARTICLES_COUNT);
    } catch {
      return rejectWithValue('Failed to fetch articles');
    }
  }
);
