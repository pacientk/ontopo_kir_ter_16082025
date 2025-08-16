import axios, { AxiosInstance, AxiosResponse } from 'axios';
import { NewsApiResponse } from '../types';
import { API_ENDPOINTS } from '../utils';

const NEWS_API_KEY = process.env.EXPO_PUBLIC_NEWS_API_KEY;
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';
const REQUEST_TIMEOUT = 10000;

interface NewsApiError extends Error {
  status?: number;
  code?: string;
  originalError?: unknown;
}

class NewsApi {
  private readonly api: AxiosInstance;

  constructor() {
    this.api = axios.create({
      baseURL: API_ENDPOINTS.NEWS_API,
      timeout: REQUEST_TIMEOUT,
      headers: {
        'X-API-Key': NEWS_API_KEY,
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
    console.log(`NewsApi initialized. Mock mode: ${USE_MOCK_DATA}`);
  }

  private setupInterceptors(): void {
    this.api.interceptors.request.use(
      config => {
        console.log('📰 News API Request:', config.method?.toUpperCase(), config.url);
        return config;
      },
      error => {
        console.error('❌ News API Request Error:', error);
        return Promise.reject(error);
      }
    );

    this.api.interceptors.response.use(
      (response: AxiosResponse<NewsApiResponse>) => {
        console.log('✅ News API Response:', response.status);
        return response;
      },
      error => {
        console.error('❌ News API Response Error:', error.response?.status, error.message);
        return Promise.reject(error);
      }
    );
  }

  private validateApiKey(): void {
    if (!USE_MOCK_DATA && (!NEWS_API_KEY || NEWS_API_KEY.length === 0)) {
      throw this.createNewsApiError(
        'News API key is required. Please set EXPO_PUBLIC_NEWS_API_KEY in your environment variables.',
        undefined,
        'MISSING_API_KEY'
      );
    }
  }

  private createNewsApiError(
    message: string,
    status?: number,
    code?: string,
    originalError?: unknown
  ): NewsApiError {
    const error = new Error(message) as NewsApiError;
    error.name = 'NewsApiError';
    error.status = status;
    error.code = code;
    error.originalError = originalError;
    return error;
  }

  private validateNewsApiResponse(data: NewsApiResponse): void {
    if (!data) {
      throw this.createNewsApiError('Empty response from News API');
    }

    if (data.status !== 'ok') {
      throw this.createNewsApiError(
        data.message || 'News API returned error status',
        undefined,
        data.code || 'API_ERROR'
      );
    }

    if (!data.articles || !Array.isArray(data.articles)) {
      throw this.createNewsApiError('Invalid response format: missing articles array');
    }

    if (data.articles.length === 0) {
      throw this.createNewsApiError('No articles found in the response');
    }

    console.log(`📊 Received ${data.articles.length} articles from News API`);
  }

  async getTopHeadlines(): Promise<NewsApiResponse> {
    try {
      if (USE_MOCK_DATA) {
        console.log('🔧 Using mock data for news');
        const { mockNewsData } = await import('../utils/mockData');
        this.validateNewsApiResponse(mockNewsData);
        return mockNewsData;
      }

      this.validateApiKey();

      const response = await this.api.get<NewsApiResponse>('/top-headlines', {
        params: {
          country: 'us',
          pageSize: 14,
          category: 'general',
        },
      });

      if (response.status !== 200) {
        throw this.createNewsApiError(`HTTP error: ${response.status}`, response.status);
      }

      this.validateNewsApiResponse(response.data);

      return response.data;
    } catch (error) {
      console.error('News API error:', error);

      // Re-throw NewsApiError as-is
      if (error instanceof Error && error.name === 'NewsApiError') {
        throw error;
      }

      // eslint-disable-next-line import/no-named-as-default-member
      if (axios.isAxiosError(error)) {
        if (error.code === 'ECONNABORTED') {
          throw this.createNewsApiError(
            'Request timeout. Please check your internet connection.',
            undefined,
            'TIMEOUT',
            error
          );
        }

        if (error.response?.status === 401) {
          throw this.createNewsApiError(
            'Invalid API key. Please check your News API key.',
            401,
            'UNAUTHORIZED',
            error
          );
        }

        if (error.response?.status === 429) {
          throw this.createNewsApiError(
            'Rate limit exceeded. Please try again later.',
            429,
            'RATE_LIMIT',
            error
          );
        }

        if (error.response?.status && error.response?.status >= 500) {
          throw this.createNewsApiError(
            'News API server error. Please try again later.',
            error.response?.status,
            'SERVER_ERROR',
            error
          );
        }

        throw this.createNewsApiError(
          `Network error: ${error.message}`,
          error.response?.status,
          'NETWORK_ERROR',
          error
        );
      }

      throw this.createNewsApiError(
        `Unexpected error: ${error instanceof Error ? error.message : 'Unknown error'}`,
        undefined,
        'UNKNOWN_ERROR',
        error
      );
    }
  }
}

export const newsApi = new NewsApi();
