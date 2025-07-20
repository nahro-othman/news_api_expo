import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Chip } from 'react-native-paper';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
}

const categories = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
];

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  selectedCategory,
  onCategorySelect,
}) => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {categories.map((category) => (
          <Chip
            key={category.id}
            selected={selectedCategory === category.id}
            onPress={() => onCategorySelect(category.id)}
            style={[
              styles.chip,
              selectedCategory === category.id && styles.selectedChip
            ]}
            mode={selectedCategory === category.id ? 'flat' : 'outlined'}
            textStyle={[
              styles.chipText,
              selectedCategory === category.id && styles.selectedChipText
            ]}
          >
            {category.label}
          </Chip>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: 12,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chip: {
    marginHorizontal: 4,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  selectedChip: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  chipText: {
    color: '#000000',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#ffffff',
    fontWeight: '500',
  },
}); 