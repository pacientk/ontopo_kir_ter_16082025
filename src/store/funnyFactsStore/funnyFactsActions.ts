import { createAsyncThunk } from '@reduxjs/toolkit';
import { FunnyFact, NewsArticle } from '../../types';
import { aiService } from '../../services';

interface GenerateFunnyFactsError {
  message: string;
  failedArticles?: number;
  totalArticles?: number;
}

export const generateFunnyFacts = createAsyncThunk<
  FunnyFact[],
  NewsArticle[],
  { rejectValue: GenerateFunnyFactsError }
>('funnyFacts/generateFunnyFacts', async (articles: NewsArticle[], { rejectWithValue }) => {
  if (!articles || articles.length === 0) {
    return rejectWithValue({
      message: 'No articles provided for funny fact generation',
    });
  }

  const funnyFacts: FunnyFact[] = [];

  console.log(`Starting funny facts generation for ${articles.length} articles`);

  for (const article of articles) {
    try {
      const funnyFactText = await aiService.generateFunnyFact(
        article.title,
        article.description || article.content
      );

      funnyFacts.push({
        funnyFact: funnyFactText,
        source: article.source.name,
        originalLink: article.url,
        publicationDate: new Date(article.publishedAt).toISOString().split('T')[0],
        category: 'General',
        urlToImage: article.urlToImage,
      });

      console.log(`✅ Generated funny fact for: ${article.title.substring(0, 50)}...`);
    } catch (error) {
      console.log(`❌ Failed to generate funny fact for article: ${article.title}`, error);
    }
  }

  if (funnyFacts.length === 0) {
    return rejectWithValue({
      message: 'Failed to generate any funny facts',
    });
  }

  console.log(`🎉 Successfully generated ${funnyFacts.length} funny facts`);
  return funnyFacts;
});
