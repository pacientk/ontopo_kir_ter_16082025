import { NewsApiResponse } from '../types';

export const mockNewsData: NewsApiResponse = {
  status: 'ok',
  totalResults: 10,
  articles: [
    {
      title: 'Tech Giant Announces Revolutionary AI Assistant',
      description:
        'A major technology company has unveiled their latest artificial intelligence assistant that promises to change how we interact with computers.',
      url: 'https://example.com/tech-ai-assistant',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-23T10:00:00Z',
      source: { name: 'Tech News' },
      content:
        'The new AI assistant features advanced natural language processing and machine learning capabilities...',
    },
    {
      title: 'Climate Summit Reaches Historic Agreement',
      description:
        'World leaders have reached a groundbreaking agreement on climate change action at the annual summit.',
      url: 'https://example.com/climate-summit',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-22T15:30:00Z',
      source: { name: 'Global News' },
      content:
        'The agreement includes commitments to reduce carbon emissions by 50% over the next decade...',
    },
    {
      title: 'Breakthrough in Quantum Computing Research',
      description:
        'Scientists have achieved a major breakthrough in quantum computing that could revolutionize data processing.',
      url: 'https://example.com/quantum-computing',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-21T09:15:00Z',
      source: { name: 'Science Today' },
      content:
        'The research team successfully demonstrated quantum supremacy in real-world applications...',
    },
    {
      title: 'New Renewable Energy Storage Solution',
      description:
        'Engineers have developed an innovative energy storage system that could make renewable energy more reliable.',
      url: 'https://example.com/energy-storage',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-20T14:45:00Z',
      source: { name: 'Energy Weekly' },
      content:
        'The new battery technology offers unprecedented efficiency and longevity for grid-scale storage...',
    },
    {
      title: 'Mars Mission Discovers Signs of Ancient Water',
      description:
        "NASA's latest Mars rover has found compelling evidence of ancient water activity on the red planet.",
      url: 'https://example.com/mars-water',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-19T11:20:00Z',
      source: { name: 'Space Explorer' },
      content:
        "The rover's instruments detected mineral formations that could only have formed in the presence of liquid water...",
    },
    {
      title: 'Revolutionary Medical Treatment Shows Promise',
      description:
        'A new gene therapy treatment has shown remarkable results in early clinical trials.',
      url: 'https://example.com/gene-therapy',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-18T16:10:00Z',
      source: { name: 'Medical Journal' },
      content:
        'The treatment targets specific genetic markers and has shown success rates of over 85%...',
    },
    {
      title: 'Electric Vehicle Sales Reach New Milestone',
      description:
        'Global electric vehicle sales have surpassed expectations, marking a significant shift in transportation.',
      url: 'https://example.com/ev-sales',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-17T13:30:00Z',
      source: { name: 'Auto Industry' },
      content:
        'The surge in EV adoption is driven by improved battery technology and expanding charging infrastructure...',
    },
    {
      title: 'Artificial Intelligence Helps Solve Climate Models',
      description: 'Researchers are using machine learning to improve climate prediction accuracy.',
      url: 'https://example.com/ai-climate',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-16T08:45:00Z',
      source: { name: 'Climate Science' },
      content:
        'AI algorithms are processing vast amounts of environmental data to create more precise weather forecasts...',
    },
    {
      title: 'New Social Media Platform Focuses on Privacy',
      description:
        'A startup has launched a social networking platform that prioritizes user privacy and data protection.',
      url: 'https://example.com/privacy-social',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-15T12:15:00Z',
      source: { name: 'Tech Trends' },
      content:
        'The platform uses end-to-end encryption and gives users complete control over their personal data...',
    },
    {
      title: 'Sustainable Fashion Movement Gains Momentum',
      description:
        'The fashion industry is embracing sustainable practices as consumers demand eco-friendly options.',
      url: 'https://example.com/sustainable-fashion',
      urlToImage: 'https://picsum.photos/400/200',
      publishedAt: '2024-12-14T15:50:00Z',
      source: { name: 'Fashion Forward' },
      content:
        'Major brands are investing in recycled materials and ethical manufacturing processes...',
    },
  ],
};

export const mockFunnyFacts: string[] = [
  '⟩ Breaking: Local man discovers that his refrigerator has been judging his late-night snack choices all along!',
  '⟩ Scientists confirm that Monday mornings are indeed a conspiracy designed by coffee companies!',
  '⟩ Weather forecast predicts 100% chance of people complaining about the weather!',
  "⟩ Study reveals that 9 out of 10 people don't know they're the 10th person!",
  '⟩ Local cat appointed as new CEO after demonstrating superior napping skills!',
  '⟩ Tech breakthrough: Scientists finally figure out why USB cables need three attempts to plug in correctly!',
  "⟩ Economic experts baffled: Man saves money by not buying things he doesn't need!",
  "⟩ Breaking research: Vegetables taste better when you pretend they're pizza!",
  '⟩ Social media study finds people more interested in photos of food than actual food!',
  '⟩ Space mission success: Astronauts confirm Earth looks round from space, flat-earthers request second opinion!',
  '⟩ Financial news: Cryptocurrency investor accidentally makes money, economists confused!',
  '⟩ Sports update: Local team wins game, fans unsure how to handle emotions!',
  '⟩ Politics simplified: Everyone agrees to disagree, world peace achieved for 5 minutes!',
  '⟩ Health tip: Walking 10,000 steps daily recommended, elevators file complaint!',
  '⟩ Tech news: New app promises to fix all problems, creates 47 new ones instead!',
];

export const aiApiFallbacks: string[] = [
  '⟩ AI is taking a coffee break, but the news is still funny!',
  "⟩ Error 404: Humor not found, but we're still laughing!",
  "⟩ Technical difficulties, but at least it's not Monday!",
  '⟩ News so fresh, even our AI needs time to process it!',
  '⟩ Breaking: Comedy generator temporarily broken, irony intact!',
];
