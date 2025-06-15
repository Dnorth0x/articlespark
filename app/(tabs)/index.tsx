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
import { ZeroState } from '@/components/ZeroState';
import { ResultsDisplay } from '@/components/ResultsDisplay';

export default function ArticleSparkScreen() {
  const [topic, setTopic] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [results, setResults] = useState<ContentIdeas | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = async () => {
    if (!topic.trim()) {
      setError('Please enter a topic to generate ideas');
      return;
    }

    setIsLoading(true);
    setResults(null);
    setError(null);

    try {
      const data = await generateContentIdeas(topic);
      setResults(data);
    } catch (error) {
      console.error(error);
      setError('Failed to generate content ideas. Please check your connection and try again.');
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
              onChangeText={(text) => {
                setTopic(text);
                if (error) setError(null); // Clear error when user starts typing
              }}
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

          <ResultsDisplay 
            isLoading={isLoading}
            results={results}
            error={error}
          />

          {!isLoading && !results && !error && (
            <ZeroState />
          )}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

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
});