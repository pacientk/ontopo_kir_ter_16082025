import { openaiApi } from './openaiApi';
import { geminiApi } from './geminiApi';
import { mockFunnyFacts } from '../utils';
import { AIProvider } from '../types';

const AI_PROVIDER = (process.env.EXPO_PUBLIC_AI_PROVIDER || 'gemini') as AIProvider;
const USE_MOCK_DATA = process.env.EXPO_PUBLIC_USE_MOCK_DATA === 'true';

interface AIServiceError extends Error {
  provider: AIProvider;
  originalError?: unknown;
}

class AIService {
  private readonly currentProvider: AIProvider;

  constructor() {
    this.currentProvider = USE_MOCK_DATA ? 'mock' : AI_PROVIDER;
    console.log(`AI Service initialized with provider: ${this.currentProvider}`);
  }

  async generateFunnyFact(title: string, content: string): Promise<string> {
    try {
      switch (this.currentProvider) {
        case 'openai':
          return await openaiApi.generateFunnyFact(title, content);

        case 'gemini':
          return await geminiApi.generateFunnyFact(title, content);

        case 'mock':
          return await this.getMockFunnyFact();

        default:
          throw this.createAIServiceError(
            `Unknown AI provider: ${this.currentProvider}`,
            this.currentProvider
          );
      }
    } catch (error) {
      console.log(`AI Service error with provider ${this.currentProvider}:`, error);

      // If it's already an AIServiceError, re-throw it
      if (this.isAIServiceError(error)) {
        throw error;
      }

      throw this.createAIServiceError(
        `Failed to generate funny fact using ${this.currentProvider}`,
        this.currentProvider,
        error
      );
    }
  }

  private async getMockFunnyFact(): Promise<string> {
    const randomIndex = Math.floor(Math.random() * mockFunnyFacts.length);
    return mockFunnyFacts[randomIndex];
  }

  private createAIServiceError(
    message: string,
    provider: AIProvider,
    originalError?: unknown
  ): AIServiceError {
    const error = new Error(message) as AIServiceError;
    error.name = 'AIServiceError';
    error.provider = provider;
    error.originalError = originalError;
    return error;
  }

  private isAIServiceError(error: unknown): error is AIServiceError {
    return error instanceof Error && error.name === 'AIServiceError';
  }
}

export const aiService = new AIService();
