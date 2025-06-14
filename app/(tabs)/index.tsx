import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator, 
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Stack } from 'expo-router';
import { ChevronRight, Sparkles } from 'lucide-react-native';
import colors from '@/constants/colors';
import { generateContentIdeas } from '@/services/aiService';
import { ContentIdeas } from '@/types';

export default function ArticleSparkScreen() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ContentIdeas | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      Alert.alert('Please enter a topic');
      return;
    }

    setIsLoading(true);
    setResults(null);

    try {
      const data = await generateContentIdeas(topic);
      setResults(data);
    } catch (error) {
      console.error(error);
      Alert.alert(
        'Error',
        'Failed to generate content ideas. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <Stack.Screen 
        options={{
          title: 'ArticleSpark',
          headerStyle: {
            backgroundColor: colors.light.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />

      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Sparkles size={24} color={colors.light.primary} />
            <Text style={styles.headerText}>Content Idea Generator</Text>
          </View>
          
          <Text style={styles.description}>
            Enter a niche topic to generate SEO keywords, blog titles, and social media hooks.
          </Text>
          
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder="Enter your niche topic (e.g., sustainable gardening)"
              value={topic}
              onChangeText={setTopic}
              placeholderTextColor={colors.light.placeholderText}
            />
            <TouchableOpacity 
              style={[
                styles.button,
                !topic.trim() && styles.buttonDisabled
              ]}
              onPress={handleGenerate}
              disabled={!topic.trim() || isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <>
                  <Text style={styles.buttonText}>Generate Ideas</Text>
                  <ChevronRight size={18} color="#fff" />
                </>
              )}
            </TouchableOpacity>
          </View>

          {isLoading && (
            <View style={styles.loadingContainer}>
              <ActivityIndicator size="large" color={colors.light.primary} />
              <Text style={styles.loadingText}>Generating brilliant ideas...</Text>
            </View>
          )}

          {results && !isLoading && (
            <View style={styles.resultsContainer}>
              <ResultsSection 
                title="SEO Keywords" 
                items={results.seoKeywords} 
                icon="🔍"
              />
              <ResultsSection 
                title="Blog Post Titles" 
                items={results.blogTitles} 
                icon="✍️"
              />
              <ResultsSection 
                title="Social Media Hooks" 
                items={results.socialHooks} 
                icon="📱"
              />
            </View>
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

interface ResultsSectionProps {
  title: string;
  items: string[];
  icon: string;
}

const ResultsSection = ({ title, items, icon }: ResultsSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <Text style={styles.sectionIcon}>{icon}</Text>
      <Text style={styles.sectionTitle}>{title}</Text>
    </View>
    <View style={styles.sectionContent}>
      {items.map((item, index) => (
        <View key={index} style={styles.itemContainer}>
          <Text style={styles.itemBullet}>•</Text>
          <Text style={styles.itemText}>{item}</Text>
        </View>
      ))}
    </View>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.light.text,
    marginLeft: 8,
  },
  description: {
    fontSize: 16,
    color: colors.light.secondaryText,
    marginBottom: 24,
    lineHeight: 22,
  },
  inputContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.light.inputBackground,
    borderRadius: 8,
    padding: 16,
    fontSize: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  button: {
    backgroundColor: colors.light.primary,
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  buttonDisabled: {
    opacity: 0.7,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
  },
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: colors.light.secondaryText,
  },
  resultsContainer: {
    marginTop: 8,
  },
  section: {
    marginBottom: 24,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  sectionIcon: {
    fontSize: 20,
    marginRight: 8,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
  },
  sectionContent: {
    marginLeft: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  itemBullet: {
    fontSize: 16,
    color: colors.light.primary,
    marginRight: 8,
    marginTop: 2,
  },
  itemText: {
    fontSize: 15,
    color: colors.light.text,
    flex: 1,
    lineHeight: 22,
  },
});