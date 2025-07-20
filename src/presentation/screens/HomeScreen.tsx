import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../../application/providers/NewsProvider';
import { useSettings } from '../../application/providers/SettingsProvider';
import { ArticleCard } from '../components/ArticleCard';
import { FilterBar } from '../components/FilterBar';
import { Container } from '../../infrastructure/di/Container';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { articles, loading, error, getTopHeadlines } = useNews();
  const { settings } = useSettings();
  
  // Initialize with user's default settings
  const [selectedCategory, setSelectedCategory] = useState(settings.defaultCategory);
  const [selectedCountry, setSelectedCountry] = useState(settings.defaultCountry);
  const [selectedSource, setSelectedSource] = useState('');
  const [selectedDateRange, setSelectedDateRange] = useState('all');
  const [refreshing, setRefreshing] = useState(false);

  const newsService = Container.getNewsService();

  // Update filters when settings change
  useEffect(() => {
    setSelectedCategory(settings.defaultCategory);
    setSelectedCountry(settings.defaultCountry);
  }, [settings.defaultCategory, settings.defaultCountry]);

  useEffect(() => {
    loadTopHeadlines();
  }, [selectedCategory, selectedCountry, selectedSource, selectedDateRange, settings.articlesPerPage]);

  const loadTopHeadlines = async () => {
    const dateFilter = newsService.createDateFilter(selectedDateRange);
    
    const params = {
      country: selectedCountry,
      category: selectedCategory,
      ...(selectedSource && { source: selectedSource }),
      ...dateFilter,
      pageSize: settings.articlesPerPage,
    };

    await getTopHeadlines(params);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTopHeadlines();
    setRefreshing(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleCountrySelect = (country: string) => {
    setSelectedCountry(country);
  };

  const handleSourceSelect = (source: string) => {
    setSelectedSource(source);
  };

  const handleDateRangeSelect = (dateRange: string) => {
    setSelectedDateRange(dateRange);
  };

  const handleClearFilters = () => {
    setSelectedCategory(settings.defaultCategory);
    setSelectedCountry(settings.defaultCountry);
    setSelectedSource('');
    setSelectedDateRange('all');
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

  const renderHeader = () => (
    <FilterBar
      selectedCategory={selectedCategory}
      selectedCountry={selectedCountry}
      selectedSource={selectedSource}
      selectedDateRange={selectedDateRange}
      onCategorySelect={handleCategorySelect}
      onCountrySelect={handleCountrySelect}
      onSourceSelect={handleSourceSelect}
      onDateRangeSelect={handleDateRangeSelect}
      onClearFilters={handleClearFilters}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <Text style={styles.emptyText}>
        No articles found with the current filters.
      </Text>
      <Text style={styles.emptySubtext}>
        Try adjusting your filters or check your settings for default preferences.
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading news...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.container}>
        {renderHeader()}
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
        ListEmptyComponent={!loading ? renderEmptyState : null}
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
  listContainer: {
    paddingBottom: 20,
  },
  emptyContainer: {
    flexGrow: 1,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
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
}); 