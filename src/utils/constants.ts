export const ARTICLES_COUNT = 10 as const;

export const API_ENDPOINTS = {
  NEWS_API: 'https://newsapi.org/v2',
  OPENAI_API: 'https://api.openai.com/v1',
  GEMINI_API: 'https://generativelanguage.googleapis.com/v1beta',
} as const;

Object.freeze(API_ENDPOINTS);

export const COLORS = {
  PRIMARY: '#202020',
  SECONDARY: '#d6d6d6',
  BACKGROUND: '#171717',
  WHITE: '#FFFFFF',
  BLACK: '#000000',
  GRAYDARK: '#474646',
  GRAYLIGHT: '#979898',
  ERROR: '#FF6B6B',
  LINK: '#007AFF',
} as const;

export const FONTS = {
  BOLD: '600',
} as const;
