import axios from 'axios';
import { OpenAIResponse } from '../types';
import { API_ENDPOINTS } from '../utils';

const OPENAI_API_KEY = process.env.EXPO_PUBLIC_OPENAI_API_KEY;

class OpenAIApi {
  private api = axios.create({
    baseURL: API_ENDPOINTS.OPENAI_API,
    headers: {
      Authorization: `Bearer ${OPENAI_API_KEY}`,
      'Content-Type': 'application/json',
    },
  });

  private validateApiKey(): void {
    if (!OPENAI_API_KEY || OPENAI_API_KEY.length === 0) {
      throw new Error(
        'OpenAI API key is required. Please set EXPO_PUBLIC_OPENAI_API_KEY in your environment variables.'
      );
    }
  }

  async generateFunnyFact(title: string, content: string): Promise<string> {
    this.validateApiKey();

    const prompt = `Transform this news article into a SHORT funny fact (maximum 120 characters). Make it humorous but not offensive. Focus on wordplay, irony, or absurd observations:

    Title: ${title.substring(0, 100)}
    Content: ${content.substring(0, 200)}
    
    Reply with ONLY the funny fact, nothing else.`;

    const response = await this.api.post<OpenAIResponse>('/chat/completions', {
      model: 'gpt-4o-mini',
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
      max_tokens: 100,
      temperature: 0.9,
    });

    return response.data.choices[0].message.content.trim();
  }
}

export const openaiApi = new OpenAIApi();
