import React, { useState } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Alert } from 'react-native';
import { Copy, CopyCheck } from 'lucide-react-native';
import * as Clipboard from 'expo-clipboard';
import { Platform } from 'react-native';
import colors from '@/constants/colors';
import { ContentIdeas } from '@/types';

interface ResultsDisplayProps {
  isLoading: boolean;
  results: ContentIdeas | null;
  error: string | null;
}

export const ResultsDisplay = ({ isLoading, results, error }: ResultsDisplayProps) => {
  const [copiedItems, setCopiedItems] = useState<Set<string>>(new Set());
  const [copiedSections, setCopiedSections] = useState<Set<string>>(new Set());

  const copyToClipboard = async (text: string, itemId: string) => {
    try {
      if (Platform.OS === 'web') {
        // Web fallback
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          // Fallback for older browsers
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      } else {
        await Clipboard.setStringAsync(text);
      }
      
      setCopiedItems(prev => new Set(prev).add(itemId));
      setTimeout(() => {
        setCopiedItems(prev => {
          const newSet = new Set(prev);
          newSet.delete(itemId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  const copyAllToClipboard = async (items: string[], sectionId: string) => {
    const text = items.join('\n');
    try {
      if (Platform.OS === 'web') {
        if (navigator.clipboard) {
          await navigator.clipboard.writeText(text);
        } else {
          const textArea = document.createElement('textarea');
          textArea.value = text;
          document.body.appendChild(textArea);
          textArea.select();
          document.execCommand('copy');
          document.body.removeChild(textArea);
        }
      } else {
        await Clipboard.setStringAsync(text);
      }
      
      setCopiedSections(prev => new Set(prev).add(sectionId));
      setTimeout(() => {
        setCopiedSections(prev => {
          const newSet = new Set(prev);
          newSet.delete(sectionId);
          return newSet;
        });
      }, 2000);
    } catch (error) {
      Alert.alert('Error', 'Failed to copy to clipboard');
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={colors.light.primary} />
        <Text style={styles.loadingText}>Generating brilliant ideas...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  if (!results) {
    return null;
  }

  return (
    <View style={styles.resultsContainer}>
      <ResultsSection 
        title="SEO Keywords" 
        items={results.seoKeywords} 
        icon="🔍"
        sectionId="seo"
        copiedItems={copiedItems}
        copiedSections={copiedSections}
        onCopyItem={copyToClipboard}
        onCopyAll={copyAllToClipboard}
      />
      <ResultsSection 
        title="Blog Post Titles" 
        items={results.blogTitles} 
        icon="✍️"
        sectionId="blog"
        copiedItems={copiedItems}
        copiedSections={copiedSections}
        onCopyItem={copyToClipboard}
        onCopyAll={copyAllToClipboard}
      />
      <ResultsSection 
        title="Social Media Hooks" 
        items={results.socialHooks} 
        icon="📱"
        sectionId="social"
        copiedItems={copiedItems}
        copiedSections={copiedSections}
        onCopyItem={copyToClipboard}
        onCopyAll={copyAllToClipboard}
      />
    </View>
  );
};

interface ResultsSectionProps {
  title: string;
  items: string[];
  icon: string;
  sectionId: string;
  copiedItems: Set<string>;
  copiedSections: Set<string>;
  onCopyItem: (text: string, itemId: string) => void;
  onCopyAll: (items: string[], sectionId: string) => void;
}

const ResultsSection = ({ 
  title, 
  items, 
  icon, 
  sectionId, 
  copiedItems, 
  copiedSections, 
  onCopyItem, 
  onCopyAll 
}: ResultsSectionProps) => (
  <View style={styles.section}>
    <View style={styles.sectionHeader}>
      <View style={styles.sectionTitleContainer}>
        <Text style={styles.sectionIcon}>{icon}</Text>
        <Text style={styles.sectionTitle}>{title}</Text>
      </View>
      <TouchableOpacity 
        style={styles.copyAllButton}
        onPress={() => onCopyAll(items, sectionId)}
      >
        {copiedSections.has(sectionId) ? (
          <CopyCheck size={16} color={colors.light.success} />
        ) : (
          <Copy size={16} color={colors.light.primary} />
        )}
        <Text style={[
          styles.copyAllText,
          copiedSections.has(sectionId) && styles.copiedText
        ]}>
          {copiedSections.has(sectionId) ? 'Copied!' : 'Copy All'}
        </Text>
      </TouchableOpacity>
    </View>
    <View style={styles.sectionContent}>
      {items.map((item, index) => {
        const itemId = `${sectionId}-${index}`;
        const isCopied = copiedItems.has(itemId);
        
        return (
          <View key={index} style={styles.itemContainer}>
            <View style={styles.itemContent}>
              <Text style={styles.itemBullet}>•</Text>
              <Text style={styles.itemText}>{item}</Text>
            </View>
            <TouchableOpacity 
              style={styles.copyButton}
              onPress={() => onCopyItem(item, itemId)}
            >
              {isCopied ? (
                <CopyCheck size={14} color={colors.light.success} />
              ) : (
                <Copy size={14} color={colors.light.secondaryText} />
              )}
            </TouchableOpacity>
          </View>
        );
      })}
    </View>
  </View>
);

const styles = StyleSheet.create({
  loadingContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: colors.light.secondaryText,
    fontWeight: '500',
  },
  errorContainer: {
    backgroundColor: `${colors.light.error}15`,
    borderRadius: 8,
    padding: 16,
    marginTop: 8,
    borderLeftWidth: 4,
    borderLeftColor: colors.light.error,
  },
  errorText: {
    fontSize: 15,
    color: colors.light.error,
    lineHeight: 22,
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
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  sectionTitleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
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
  copyAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: `${colors.light.primary}10`,
    borderRadius: 6,
  },
  copyAllText: {
    fontSize: 12,
    color: colors.light.primary,
    fontWeight: '600',
    marginLeft: 4,
  },
  copiedText: {
    color: colors.light.success,
  },
  sectionContent: {
    marginLeft: 4,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  itemContent: {
    flexDirection: 'row',
    flex: 1,
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
  copyButton: {
    padding: 8,
    marginLeft: 8,
  },
});