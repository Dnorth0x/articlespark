import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Linking, ScrollView, Alert } from 'react-native';
import { Stack } from 'expo-router';
import { ExternalLink, Info, Key, Mail, Check } from 'lucide-react-native';
import colors from '@/constants/colors';

export default function SettingsScreen() {
  const handleApiKeyStatus = () => {
    Alert.alert(
      "API Key Status",
      "Gemini API key is configured and ready to use.",
      [{ text: "OK" }]
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen 
        options={{
          title: 'Settings',
          headerStyle: {
            backgroundColor: colors.light.primary,
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }} 
      />
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>API Configuration</Text>
          <TouchableOpacity style={styles.settingItem} onPress={handleApiKeyStatus}>
            <Check size={20} color={colors.light.success} />
            <Text style={styles.settingText}>Gemini API Key: Active</Text>
          </TouchableOpacity>
          <Text style={styles.helpText}>
            ArticleSpark is using the Gemini API to generate content ideas
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About</Text>
          <TouchableOpacity 
            style={styles.settingItem}
            onPress={() => Linking.openURL('https://ai.google.dev/')}
          >
            <ExternalLink size={20} color={colors.light.primary} />
            <Text style={styles.settingText}>Google Gemini API</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Info size={20} color={colors.light.primary} />
            <Text style={styles.settingText}>App Version 1.0.0</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem}>
            <Mail size={20} color={colors.light.primary} />
            <Text style={styles.settingText}>Contact Support</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            ArticleSpark © 2025
          </Text>
          <Text style={styles.footerSubtext}>
            Powered by Google Gemini AI
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: 16,
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  settingText: {
    fontSize: 16,
    color: colors.light.text,
    marginLeft: 12,
  },
  helpText: {
    fontSize: 14,
    color: colors.light.secondaryText,
    marginTop: 12,
    lineHeight: 20,
  },
  footer: {
    marginTop: 24,
    marginBottom: 32,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: colors.light.secondaryText,
    marginBottom: 4,
  },
  footerSubtext: {
    fontSize: 12,
    color: colors.light.secondaryText,
    opacity: 0.8,
  },
});