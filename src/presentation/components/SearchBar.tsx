import React, { useState } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = "Search news articles..." 
}) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = () => {
    if (query.trim()) {
      onSearch(query.trim());
    }
  };

  const handleClear = () => {
    setQuery('');
  };

  return (
    <View style={styles.container}>
      <View style={[styles.searchContainer, isFocused && styles.focusedContainer]}>
        
        {/* Search Icon */}
        <TouchableOpacity onPress={handleSubmit} style={styles.searchIconContainer}>
          <MaterialIcons name="search" size={20} color="#000000" />
        </TouchableOpacity>

        {/* Text Input */}
        <TextInput
          style={styles.textInput}
          value={query}
          onChangeText={setQuery}
          placeholder={placeholder}
          placeholderTextColor="#999999"
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          onSubmitEditing={handleSubmit}
          returnKeyType="search"
          autoCapitalize="none"
          autoCorrect={false}
        />

        {/* Clear Button */}
        {query.length > 0 && (
          <TouchableOpacity onPress={handleClear} style={styles.clearIconContainer}>
            <MaterialIcons name="close" size={18} color="#666666" />
          </TouchableOpacity>
        )}

        {/* Search Button */}
        {query.length > 0 && (
          <TouchableOpacity onPress={handleSubmit} style={styles.searchButton}>
            <MaterialIcons name="arrow-forward" size={16} color="#ffffff" />
          </TouchableOpacity>
        )}
        
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    paddingHorizontal: 12,
    height: 48,
  },
  focusedContainer: {
    borderColor: '#000000',
  },
  searchIconContainer: {
    marginRight: 8,
    padding: 4,
  },
  textInput: {
    flex: 1,
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
    paddingVertical: 0,
  },
  clearIconContainer: {
    marginLeft: 8,
    padding: 4,
  },
  searchButton: {
    backgroundColor: '#000000',
    marginLeft: 8,
    paddingHorizontal: 12,
    paddingVertical: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
}); 