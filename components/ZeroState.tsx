import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Lightbulb, Target, TrendingUp } from 'lucide-react-native';
import colors from '@/constants/colors';

export const ZeroState = () => {
  return (
    <View style={styles.container}>
      <View style={styles.iconContainer}>
        <Lightbulb size={48} color={colors.light.primary} />
      </View>
      
      <Text style={styles.headline}>Unlock Your Content Strategy</Text>
      
      <Text style={styles.description}>
        Transform any niche topic into a complete content marketing toolkit. Get SEO-optimized keywords, 
        compelling blog titles, and engaging social media hooks—all powered by AI.
      </Text>
      
      <View style={styles.featuresContainer}>
        <View style={styles.feature}>
          <Target size={20} color={colors.light.secondary} />
          <Text style={styles.featureText}>SEO Keywords</Text>
        </View>
        <View style={styles.feature}>
          <TrendingUp size={20} color={colors.light.secondary} />
          <Text style={styles.featureText}>Blog Titles</Text>
        </View>
        <View style={styles.feature}>
          <Lightbulb size={20} color={colors.light.secondary} />
          <Text style={styles.featureText}>Social Hooks</Text>
        </View>
      </View>
      
      <Text style={styles.cta}>
        Enter a topic above to get started!
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 20,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.light.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 24,
  },
  headline: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.light.text,
    textAlign: 'center',
    marginBottom: 16,
  },
  description: {
    fontSize: 16,
    color: colors.light.secondaryText,
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 32,
  },
  featuresContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 32,
  },
  feature: {
    alignItems: 'center',
    flex: 1,
  },
  featureText: {
    fontSize: 14,
    color: colors.light.text,
    marginTop: 8,
    fontWeight: '500',
  },
  cta: {
    fontSize: 16,
    color: colors.light.primary,
    fontWeight: '600',
    textAlign: 'center',
  },
});