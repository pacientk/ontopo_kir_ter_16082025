import React from 'react';
import { ScrollView, StyleSheet, Text, View } from 'react-native';
import { COLORS, FONTS } from '../../utils';

export const AboutScreen: React.FC = () => {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.content}>
      <View style={styles.section}>
        <Text style={styles.title}>Funny Facts App</Text>
        <Text style={styles.version}>Version 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>
          This app transforms real news articles into funny facts using AI. Get your daily dose of
          humor while staying informed!
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Features</Text>
        <Text style={styles.description}>• Real-time news fetching</Text>
        <Text style={styles.description}>• AI-powered humor generation</Text>
        <Text style={styles.description}>• Pull-to-refresh functionality</Text>
        <Text style={styles.description}>• Offline caching</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Technology Stack</Text>
        <Text style={styles.description}>• React Native 0.76</Text>
        <Text style={styles.description}>• TypeScript</Text>
        <Text style={styles.description}>• Redux Toolkit</Text>
        <Text style={styles.description}>• News API</Text>
        <Text style={styles.description}>
          • OpenAI or Gemini API. {'\n'}
          {'\n'}
          I&#39;m unemployed! I don&#39;t have money for all sorts of weird things. 😎 However, if
          you are wealthy enough, you can add your an OpenAI API key to the environment file and
          change AI{'\u00A0'}PROVIDER to &#34;openai&#34;.
        </Text>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>Created by Kir Ter for Ontopo</Text>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.BACKGROUND,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
    backgroundColor: COLORS.PRIMARY,
    padding: 16,
    borderRadius: 12,
    shadowColor: COLORS.BLACK,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  title: {
    fontSize: 28,
    fontWeight: FONTS.BOLD,
    color: COLORS.WHITE,
    textAlign: 'center',
    marginBottom: 8,
  },
  version: {
    fontSize: 14,
    color: COLORS.GRAYLIGHT,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: FONTS.BOLD,
    color: COLORS.WHITE,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    lineHeight: 20,
    color: COLORS.WHITE,
  },
  footer: {
    marginTop: 2,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: COLORS.GRAYLIGHT,
  },
});
