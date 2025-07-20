import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Text, Chip } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../../application/providers/NewsProvider';
import { useSettings } from '../../application/providers/SettingsProvider';
import { ArticleCard } from '../components/ArticleCard';
import { SearchBar } from '../components/SearchBar';

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { articles, loading, error, searchArticles } = useNews();
  const { settings } = useSettings();
  const [refreshing, setRefreshing] = useState(false);
  const [lastSearchParams, setLastSearchParams] = useState<any>(null);
  const [selectedSortBy, setSelectedSortBy] = useState<'relevancy' | 'popularity' | 'publishedAt'>(settings.defaultSortBy);

  const sortOptions = [
    { id: 'publishedAt', label: 'Latest' },
    { id: 'relevancy', label: 'Relevance' },
    { id: 'popularity', label: 'Popular' },
  ];

  const handleSearch = async (query: string) => {
    if (!query.trim()) return;

    const searchParams = {
      q: query.trim(),
      sortBy: selectedSortBy,
      pageSize: settings.articlesPerPage,
    };

    setLastSearchParams(searchParams);
    await searchArticles(searchParams);
  };

  const handleRefresh = async () => {
    if (lastSearchParams) {
      setRefreshing(true);
      await searchArticles(lastSearchParams);
      setRefreshing(false);
    }
  };

  const handleSortChange = async (sortBy: 'relevancy' | 'popularity' | 'publishedAt') => {
    setSelectedSortBy(sortBy);
    
    if (lastSearchParams) {
      const updatedParams = {
        ...lastSearchParams,
        sortBy,
        pageSize: settings.articlesPerPage,
      };
      setLastSearchParams(updatedParams);
      await searchArticles(updatedParams);
    }
  };

  const handleArticlePress = (article: any) => {
    navigation.navigate('ArticleDetail' as never, { article } as never);
  };

  const renderArticle = ({ item }: { item: any }) => (
    <ArticleCard 
      article={item} 
      onPress={() => handleArticlePress(item)}
      showImages={settings.showImages}
      compactView={settings.compactView}
      fontSize={settings.fontSize}
    />
  );

  const renderSortOptions = () => (
    <View style={styles.sortContainer}>
      <Text style={styles.sortLabel}>Sort by:</Text>
      <View style={styles.sortChips}>
        {sortOptions.map((option) => (
          <Chip
            key={option.id}
            selected={selectedSortBy === option.id}
            onPress={() => handleSortChange(option.id as any)}
            style={[
              styles.sortChip,
              selectedSortBy === option.id && styles.selectedSortChip
            ]}
            mode={selectedSortBy === option.id ? 'flat' : 'outlined'}
            textStyle={[
              styles.sortChipText,
              selectedSortBy === option.id && styles.selectedSortChipText
            ]}
          >
            {option.label}
          </Chip>
        ))}
      </View>
    </View>
  );

  const renderEmptyState = () => {
    if (!lastSearchParams) {
      return (
        <View style={styles.centered}>
          <Text style={styles.emptyText}>
            Search for news articles to get started
          </Text>
          <Text style={styles.emptySubtext}>
            Try searching for topics, keywords, or events
          </Text>
        </View>
      );
    }

    return (
      <View style={styles.centered}>
        <Text style={styles.emptyText}>
          No articles found for "{lastSearchParams.q}"
        </Text>
        <Text style={styles.emptySubtext}>
          Try different keywords or check your spelling
        </Text>
      </View>
    );
  };

  const renderHeader = () => (
    <View>
      <SearchBar onSearch={handleSearch} />
      {lastSearchParams && renderSortOptions()}
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <View style={styles.centered}>
          <ActivityIndicator size="large" color="#000000" />
          <Text style={styles.loadingText}>Searching...</Text>
        </View>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        <SearchBar onSearch={handleSearch} />
        <View style={styles.centered}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id || item.url}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            tintColor="#000000"
            colors={['#000000']}
          />
        }
        contentContainerStyle={articles.length === 0 ? styles.emptyContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    fontWeight: '500',
  },
  errorText: {
    fontSize: 16,
    color: '#000000',
    textAlign: 'center',
    fontWeight: '500',
  },
  emptyText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  sortContainer: {
    padding: 16,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  sortLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 8,
  },
  sortChips: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  sortChip: {
    marginRight: 8,
    marginBottom: 4,
    borderRadius: 0,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#ffffff',
  },
  selectedSortChip: {
    backgroundColor: '#000000',
    borderColor: '#000000',
  },
  sortChipText: {
    color: '#000000',
    fontWeight: '500',
    fontSize: 12,
  },
  selectedSortChipText: {
    color: '#ffffff',
    fontWeight: '500',
  },
}); 