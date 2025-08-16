import axios from 'axios';
import { aiApiFallbacks, API_ENDPOINTS } from '../utils';

const GEMINI_API_KEY = process.env.EXPO_PUBLIC_GEMINI_API_KEY;

interface GeminiResponse {
  candidates?: {
    content: {
      parts: { text: string }[];
    };
  }[];
  error?: {
    message: string;
  };
}

class GeminiApi {
  private api = axios.create({
    baseURL: API_ENDPOINTS.GEMINI_API,
    timeout: 30000,
  });

  private validateApiKey(): void {
    if (!GEMINI_API_KEY || GEMINI_API_KEY.length === 0) {
      throw new Error(
        'Gemini API key is required. Please set EXPO_PUBLIC_GEMINI_API_KEY in your environment variables.'
      );
    }
  }

  async generateFunnyFact(title: string, content: string): Promise<string> {
    this.validateApiKey();

    const prompt = `Transform this news article into a SHORT funny fact (maximum 120 characters). Make it humorous but not offensive. Focus on wordplay, irony, or absurd observations:

    Title: ${title.substring(0, 100)}
    Content: ${content.substring(0, 200)}
    
    Reply with ONLY the funny fact, nothing else.`;

    try {
      const response = await this.api.post<GeminiResponse>(
        `/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`,
        {
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
          generationConfig: {
            temperature: 0.9,
            topK: 1,
            topP: 1,
            maxOutputTokens: 100,
          },
        }
      );

      if (response.data?.candidates && response.data.candidates[0]?.content?.parts?.[0]?.text) {
        const generated = response.data.candidates[0].content.parts[0].text.trim();
        return generated.substring(0, 120);
      }

      return 'Breaking news turned into breaking comedy - details at 11!';
    } catch (error) {
      console.warn('Gemini API error:', error);
      const randomIndex = Math.floor(Math.random() * aiApiFallbacks.length);
      return aiApiFallbacks[randomIndex];
    }
  }
}

export const geminiApi = new GeminiApi();
