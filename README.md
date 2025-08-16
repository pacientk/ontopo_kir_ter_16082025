# Funny Facts App 🎭

React Native application that transforms real news into funny facts using AI.

## 🚀 Features

- 📰 Real-time news loading
- 🤖 AI-powered funny fact generation
- 🔄 Pull-to-refresh functionality
- 💾 Offline caching
- 📱 Responsive design for various devices

## ❓ What can it do?

This application (and its built-in AI) can:

- Fetch fresh news headlines via News API or use mock data in development mode
- Transform each news article into SHORT funny facts (~120 characters max) using your chosen AI provider:
    - Google Gemini (default, free tier)
    - OpenAI (paid tier, API key required)
    - Mock generator when `EXPO_PUBLIC_USE_MOCK_DATA=true` is enabled
- Update the feed with pull-to-refresh gesture and cache data offline (Redux Persist), making facts available without
  network
- Work on iOS/Android with adaptive interface

## 🛠 Technologies

- **React Native 0.79** with Expo
- **TypeScript** for type safety
- **Redux Toolkit** for state management
- **Redux Persist** for data persistence
- **React Navigation** for navigation
- **AI Providers**: OpenAI API, Google Gemini API, or Mock data
- **News API** for news fetching
- **ESLint + Prettier** for code quality

## 📁 Project Structure

```
src/
├── components             # Reusable components
│   ├── ErrorMessage/      # Error component
│   ├── FunnyFactCard/     # Fun fact card
│   └── LoadingSkeleton/   # Loading animation
├── navigation             
│   ├── AppNavigator.tsx   # App navigation
├── screens
│   ├── AboutScreen/       # Info screen
│   └── NewsScreen/        # Main fact screen
├── services
│   ├── aiService.ts       # AI services manager
│   ├── geminiApi.ts       # Gemini API service
│   ├── newsApi.ts         # News API service
│   └── openaiApi.ts       # OpenAI API service
├── store
│   ├── articlesStore/     # Redux news slices and actions
│   ├── funnyFactsStore/   # Redux generated funny facts slices and actions
│   ├── selectors.ts       # Redux selectors
│   └── store.ts           # Redux store
├── types/                 # TypeScript types
└── utils                  # Utilities and constants
```

## 🚀 Quick Start

### Prerequisites

- Node.js 18+
- npm or yarn
- Expo CLI
- iOS Simulator or Android Emulator

### Installation

1. **Clone the project**
   ```bash
   git clone git@github.com:pacientk/ontopo_kir_ter_16082025.git
   cd ontopo_kir_ter_16082025
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment setup**

   Create `.env` file based on `.env.example`:
   ```bash
   cp .env.example .env
   ```

   Edit the `.env` file:
   ```
   EXPO_PUBLIC_NEWS_API_KEY=your_news_api_key_here
   EXPO_PUBLIC_OPENAI_API_KEY=your_openai_api_key_here
   EXPO_PUBLIC_USE_MOCK_DATA=true
   ```

4. **Getting API keys**

   **News API (Required):**
    - Register at [newsapi.org](https://newsapi.org)
    - Get a free API key
    - Add to `.env` as `EXPO_PUBLIC_NEWS_API_KEY`

   **AI Provider (Choose one):**

   **Option 1: Google Gemini (Recommended - FREE)**
    - Free up to 60 requests per minute
    - Get your key: [makersuite.google.com/app/apikey](https://makersuite.google.com/app/apikey)
    - Add to `.env`: `EXPO_PUBLIC_AI_PROVIDER=gemini`

   **Option 2: OpenAI (Paid)**
    - Register at [openai.com](https://openai.com)
    - Get API key (requires payment)
    - Add to `.env`: `EXPO_PUBLIC_AI_PROVIDER=openai`

   **Option 3: Mock data (For development)**
    - No API keys required
    - Add to `.env`: `EXPO_PUBLIC_USE_MOCK_DATA=true`

5. **Run the application**
   ```bash
   # Start in development mode
   npx expo start
   
   # Run on iOS simulator
   npx expo start --ios
   
   # Run on Android emulator
   npx expo start --android
   ```

## 🧪 Development

### Development mode with mock data

To save API calls during development, set:

```bash
EXPO_PUBLIC_USE_MOCK_DATA=true
```

This will use predefined mock data instead of real APIs.

### Scripts

```bash
# Lint code
npm run lint

# Auto-fix linting
npm run lint:fix

# Format code
npm run format

# Check formatting
npm run format:check
```

### TypeScript

Type checking:

```bash
npx tsc --noEmit
```

## 📱 Usage

1. **Main screen** - displays a list of funny facts generated from news
2. **Pull-to-refresh** - pull down to refresh facts
3. **Original link** - tap "Read Original" to view the source news
4. **About screen** - information about the app and technologies

## 🎨 Design

The application uses a modern Material Design approach with:

- Clean and minimalist interface
- Responsive cards for facts
- Smooth loading animations
- Intuitive navigation

## 🐛 Known Limitations

1. **API limits** - News API has limitations for the free plan
2. **OpenAI tokens** - fact generation consumes OpenAI tokens

## 📄 License

MIT License

---

**Made with ❤️ for Ontopo**