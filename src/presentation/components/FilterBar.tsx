import React, { useState } from 'react';
import { View, ScrollView, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Chip, Modal, Portal, List } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';

interface FilterBarProps {
  selectedCategory: string;
  selectedCountry: string;
  selectedSource: string;
  selectedDateRange: string;
  onCategorySelect: (category: string) => void;
  onCountrySelect: (country: string) => void;
  onSourceSelect: (source: string) => void;
  onDateRangeSelect: (dateRange: string) => void;
  onClearFilters: () => void;
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

const countries = [
  { id: 'us', label: 'United States' },
  { id: 'gb', label: 'United Kingdom' },
  { id: 'ca', label: 'Canada' },
  { id: 'au', label: 'Australia' },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'jp', label: 'Japan' },
  { id: 'in', label: 'India' },
  { id: 'br', label: 'Brazil' },
  { id: 'mx', label: 'Mexico' },
];

const popularSources = [
  { id: '', label: 'All Sources' },
  { id: 'bbc-news', label: 'BBC News' },
  { id: 'cnn', label: 'CNN' },
  { id: 'reuters', label: 'Reuters' },
  { id: 'associated-press', label: 'Associated Press' },
  { id: 'the-wall-street-journal', label: 'Wall Street Journal' },
  { id: 'techcrunch', label: 'TechCrunch' },
  { id: 'espn', label: 'ESPN' },
  { id: 'bloomberg', label: 'Bloomberg' },
];

const dateRanges = [
  { id: 'today', label: 'Today' },
  { id: 'yesterday', label: 'Yesterday' },
  { id: 'week', label: 'Past Week' },
  { id: 'month', label: 'Past Month' },
  { id: 'all', label: 'All Time' },
];

export const FilterBar: React.FC<FilterBarProps> = ({
  selectedCategory,
  selectedCountry,
  selectedSource,
  selectedDateRange,
  onCategorySelect,
  onCountrySelect,
  onSourceSelect,
  onDateRangeSelect,
  onClearFilters,
}) => {
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [showSourceModal, setShowSourceModal] = useState(false);
  const [showDateModal, setShowDateModal] = useState(false);

  const getCountryLabel = () => {
    return countries.find(c => c.id === selectedCountry)?.label || 'Country';
  };

  const getSourceLabel = () => {
    return popularSources.find(s => s.id === selectedSource)?.label || 'All Sources';
  };

  const getDateLabel = () => {
    return dateRanges.find(d => d.id === selectedDateRange)?.label || 'All Time';
  };

  const hasActiveFilters = selectedCategory !== 'general' || 
                          selectedCountry !== 'us' || 
                          selectedSource !== '' || 
                          selectedDateRange !== 'all';

  return (
    <View style={styles.container}>
      {/* Categories */}
      <View style={styles.categorySection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              onPress={() => onCategorySelect(category.id)}
              style={[
                styles.categoryButton,
                selectedCategory === category.id && styles.selectedCategoryButton
              ]}
            >
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.selectedCategoryText
              ]}>
                {category.label}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Divider */}
      <View style={styles.divider} />

      {/* Filter Controls */}
      <View style={styles.filterControls}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.controlsContent}
        >
          {/* Country Filter */}
          <TouchableOpacity
            style={[styles.filterButton, selectedCountry !== 'us' && styles.activeFilterButton]}
            onPress={() => setShowCountryModal(true)}
          >
            <MaterialIcons name="public" size={14} color={selectedCountry !== 'us' ? '#ffffff' : '#000000'} />
            <Text style={[styles.filterButtonText, selectedCountry !== 'us' && styles.activeFilterButtonText]}>
              {getCountryLabel()}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={14} color={selectedCountry !== 'us' ? '#ffffff' : '#000000'} />
          </TouchableOpacity>

          {/* Source Filter */}
          <TouchableOpacity
            style={[styles.filterButton, selectedSource !== '' && styles.activeFilterButton]}
            onPress={() => setShowSourceModal(true)}
          >
            <MaterialIcons name="language" size={14} color={selectedSource !== '' ? '#ffffff' : '#000000'} />
            <Text style={[styles.filterButtonText, selectedSource !== '' && styles.activeFilterButtonText]}>
              {getSourceLabel()}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={14} color={selectedSource !== '' ? '#ffffff' : '#000000'} />
          </TouchableOpacity>

          {/* Date Filter */}
          <TouchableOpacity
            style={[styles.filterButton, selectedDateRange !== 'all' && styles.activeFilterButton]}
            onPress={() => setShowDateModal(true)}
          >
            <MaterialIcons name="schedule" size={14} color={selectedDateRange !== 'all' ? '#ffffff' : '#000000'} />
            <Text style={[styles.filterButtonText, selectedDateRange !== 'all' && styles.activeFilterButtonText]}>
              {getDateLabel()}
            </Text>
            <MaterialIcons name="keyboard-arrow-down" size={14} color={selectedDateRange !== 'all' ? '#ffffff' : '#000000'} />
          </TouchableOpacity>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <TouchableOpacity
              style={styles.clearButton}
              onPress={onClearFilters}
            >
              <MaterialIcons name="close" size={14} color="#666666" />
              <Text style={styles.clearButtonText}>Clear</Text>
            </TouchableOpacity>
          )}
        </ScrollView>
      </View>

      {/* Country Modal */}
      <Portal>
        <Modal
          visible={showCountryModal}
          onDismiss={() => setShowCountryModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Country</Text>
            <TouchableOpacity onPress={() => setShowCountryModal(false)}>
              <MaterialIcons name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalDivider} />
          <ScrollView style={styles.modalScroll}>
            {countries.map((country) => (
              <TouchableOpacity
                key={country.id}
                style={[
                  styles.modalOption,
                  selectedCountry === country.id && styles.selectedModalOption
                ]}
                onPress={() => {
                  onCountrySelect(country.id);
                  setShowCountryModal(false);
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedCountry === country.id && styles.selectedModalOptionText
                ]}>
                  {country.label}
                </Text>
                {selectedCountry === country.id && (
                  <MaterialIcons name="check" size={16} color="#ffffff" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>

      {/* Source Modal */}
      <Portal>
        <Modal
          visible={showSourceModal}
          onDismiss={() => setShowSourceModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Source</Text>
            <TouchableOpacity onPress={() => setShowSourceModal(false)}>
              <MaterialIcons name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalDivider} />
          <ScrollView style={styles.modalScroll}>
            {popularSources.map((source) => (
              <TouchableOpacity
                key={source.id}
                style={[
                  styles.modalOption,
                  selectedSource === source.id && styles.selectedModalOption
                ]}
                onPress={() => {
                  onSourceSelect(source.id);
                  setShowSourceModal(false);
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedSource === source.id && styles.selectedModalOptionText
                ]}>
                  {source.label}
                </Text>
                {selectedSource === source.id && (
                  <MaterialIcons name="check" size={16} color="#ffffff" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>

      {/* Date Modal */}
      <Portal>
        <Modal
          visible={showDateModal}
          onDismiss={() => setShowDateModal(false)}
          contentContainerStyle={styles.modalContent}
        >
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Date Range</Text>
            <TouchableOpacity onPress={() => setShowDateModal(false)}>
              <MaterialIcons name="close" size={20} color="#000000" />
            </TouchableOpacity>
          </View>
          <View style={styles.modalDivider} />
          <ScrollView style={styles.modalScroll}>
            {dateRanges.map((dateRange) => (
              <TouchableOpacity
                key={dateRange.id}
                style={[
                  styles.modalOption,
                  selectedDateRange === dateRange.id && styles.selectedModalOption
                ]}
                onPress={() => {
                  onDateRangeSelect(dateRange.id);
                  setShowDateModal(false);
                }}
              >
                <Text style={[
                  styles.modalOptionText,
                  selectedDateRange === dateRange.id && styles.selectedModalOptionText
                ]}>
                  {dateRange.label}
                </Text>
                {selectedDateRange === dateRange.id && (
                  <MaterialIcons name="check" size={16} color="#ffffff" />
                )}
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  categorySection: {
    paddingVertical: 16,
  },
  categoryContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  categoryButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 8,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  selectedCategoryButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  categoryText: {
    color: '#000000',
    fontWeight: '600',
    fontSize: 14,
  },
  selectedCategoryText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  divider: {
    height: 1,
    backgroundColor: '#000000',
    marginHorizontal: 16,
  },
  filterControls: {
    paddingVertical: 12,
  },
  controlsContent: {
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  filterButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  activeFilterButton: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  filterButtonText: {
    fontSize: 11,
    fontWeight: '600',
    marginHorizontal: 6,
    color: '#000000',
  },
  activeFilterButtonText: {
    color: '#ffffff',
  },
  clearButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 6,
    marginLeft: 8,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  clearButtonText: {
    fontSize: 11,
    color: '#666666',
    marginLeft: 4,
    fontWeight: '500',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    margin: 32,
    maxHeight: '70%',
    borderWidth: 2,
    borderColor: '#000000',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
  },
  modalDivider: {
    height: 2,
    backgroundColor: '#000000',
  },
  modalScroll: {
    maxHeight: 300,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  selectedModalOption: {
    backgroundColor: '#000000',
    borderBottomColor: '#333333',
  },
  modalOptionText: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '500',
  },
  selectedModalOptionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
}); 