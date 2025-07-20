import React, { useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../../application/providers/NewsProvider';
import { ArticleCard } from '../components/ArticleCard';
import { SearchBar } from '../components/SearchBar';

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation();
  const { articles, loading, error, searchArticles } = useNews();
  const [refreshing, setRefreshing] = useState(false);
  const [lastQuery, setLastQuery] = useState('');

  const handleSearch = async (query: string) => {
    setLastQuery(query);
    await searchArticles(query);
  };

  const handleRefresh = async () => {
    if (lastQuery) {
      setRefreshing(true);
      await searchArticles(lastQuery);
      setRefreshing(false);
    }
  };

  const handleArticlePress = (article: any) => {
    navigation.navigate('ArticleDetail' as never, { article } as never);
  };

  const renderArticle = ({ item }: { item: any }) => (
    <ArticleCard article={item} onPress={() => handleArticlePress(item)} />
  );

  const renderEmptyState = () => (
    <View style={styles.centered}>
      <Text style={styles.emptyText}>
        Search for news articles to get started
      </Text>
    </View>
  );

  if (loading && !refreshing) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Searching...</Text>
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
      <SearchBar onSearch={handleSearch} />
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={(item) => item.id || item.url}
        refreshControl={
          <RefreshControl 
            refreshing={refreshing} 
            onRefresh={handleRefresh}
            tintColor="#000000"
            colors={['#000000']}
          />
        }
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={renderEmptyState}
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
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    fontWeight: '500',
  },
  listContainer: {
    flexGrow: 1,
    paddingBottom: 20,
  },
}); 