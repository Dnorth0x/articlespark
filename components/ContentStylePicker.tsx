import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { ChevronDown, Check } from 'lucide-react-native';
import colors from '@/constants/colors';

const CONTENT_STYLES = [
  {
    value: 'Evergreen SEO',
    label: 'Evergreen SEO',
    description: 'Timeless, search-optimized content'
  },
  {
    value: 'Viral & Trendy',
    label: 'Viral & Trendy',
    description: 'Current trends and viral potential'
  },
  {
    value: 'Professional & Corporate',
    label: 'Professional & Corporate',
    description: 'Business-focused and authoritative'
  },
  {
    value: 'Casual & Humorous',
    label: 'Casual & Humorous',
    description: 'Fun, relatable, and entertaining'
  }
];

interface ContentStylePickerProps {
  selectedStyle: string;
  onStyleChange: (style: string) => void;
}

export const ContentStylePicker = ({ selectedStyle, onStyleChange }: ContentStylePickerProps) => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const selectedStyleData = CONTENT_STYLES.find(style => style.value === selectedStyle);

  const handleStyleSelect = (style: string) => {
    onStyleChange(style);
    setIsModalVisible(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Content Style</Text>
      <TouchableOpacity 
        style={styles.picker}
        onPress={() => setIsModalVisible(true)}
      >
        <View style={styles.pickerContent}>
          <View>
            <Text style={styles.selectedText}>{selectedStyleData?.label}</Text>
            <Text style={styles.selectedDescription}>{selectedStyleData?.description}</Text>
          </View>
          <ChevronDown size={20} color={colors.light.secondaryText} />
        </View>
      </TouchableOpacity>

      <Modal
        visible={isModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setIsModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Choose Content Style</Text>
            </View>
            <ScrollView style={styles.optionsList}>
              {CONTENT_STYLES.map((style) => (
                <TouchableOpacity
                  key={style.value}
                  style={styles.option}
                  onPress={() => handleStyleSelect(style.value)}
                >
                  <View style={styles.optionContent}>
                    <View style={styles.optionText}>
                      <Text style={styles.optionLabel}>{style.label}</Text>
                      <Text style={styles.optionDescription}>{style.description}</Text>
                    </View>
                    {selectedStyle === style.value && (
                      <Check size={20} color={colors.light.primary} />
                    )}
                  </View>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 12,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.light.text,
    marginBottom: 8,
  },
  picker: {
    backgroundColor: colors.light.inputBackground,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: colors.light.border,
  },
  pickerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
  },
  selectedText: {
    fontSize: 16,
    color: colors.light.text,
    fontWeight: '500',
  },
  selectedDescription: {
    fontSize: 14,
    color: colors.light.secondaryText,
    marginTop: 2,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '100%',
    maxWidth: 400,
    maxHeight: '80%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.25,
    shadowRadius: 20,
    elevation: 10,
  },
  modalHeader: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.light.text,
    textAlign: 'center',
  },
  optionsList: {
    maxHeight: 300,
  },
  option: {
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
  },
  optionText: {
    flex: 1,
  },
  optionLabel: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.light.text,
  },
  optionDescription: {
    fontSize: 14,
    color: colors.light.secondaryText,
    marginTop: 4,
  },
});