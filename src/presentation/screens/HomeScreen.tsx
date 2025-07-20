import React, { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet, RefreshControl } from 'react-native';
import { ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { useNews } from '../../application/providers/NewsProvider';
import { ArticleCard } from '../components/ArticleCard';
import { CategoryFilter } from '../components/CategoryFilter';

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation();
  const { articles, loading, error, getTopHeadlines } = useNews();
  const [selectedCategory, setSelectedCategory] = useState('general');
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    loadTopHeadlines();
  }, [selectedCategory]);

  const loadTopHeadlines = async () => {
    await getTopHeadlines('us', selectedCategory);
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    await loadTopHeadlines();
    setRefreshing(false);
  };

  const handleCategorySelect = (category: string) => {
    setSelectedCategory(category);
  };

  const handleArticlePress = (article: any) => {
    navigation.navigate('ArticleDetail' as never, { article } as never);
  };

  const renderArticle = ({ item }: { item: any }) => (
    <ArticleCard article={item} onPress={() => handleArticlePress(item)} />
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
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <CategoryFilter
        selectedCategory={selectedCategory}
        onCategorySelect={handleCategorySelect}
      />
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
}); 