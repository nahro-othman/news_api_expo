import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar, Button } from 'react-native-paper';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
}

export const SearchBar: React.FC<SearchBarProps> = ({ 
  onSearch, 
  placeholder = 'Search news...' 
}) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    if (searchQuery.trim()) {
      onSearch(searchQuery.trim());
    }
  };

  return (
    <View style={styles.container}>
      <Searchbar
        placeholder={placeholder}
        onChangeText={setSearchQuery}
        value={searchQuery}
        onSubmitEditing={handleSearch}
        style={styles.searchBar}
        iconColor="#000000"
        inputStyle={styles.searchInput}
      />
      <Button 
        mode="contained" 
        onPress={handleSearch}
        style={styles.button}
        labelStyle={styles.buttonLabel}
        disabled={!searchQuery.trim()}
      >
        Search
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    padding: 16,
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  searchBar: {
    flex: 1,
    marginRight: 8,
    backgroundColor: '#f8f8f8',
    borderRadius: 0,
    elevation: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  searchInput: {
    color: '#000000',
  },
  button: {
    minWidth: 80,
    backgroundColor: '#000000',
    borderRadius: 0,
    elevation: 0,
  },
  buttonLabel: {
    color: '#ffffff',
    fontWeight: '500',
  },
}); 