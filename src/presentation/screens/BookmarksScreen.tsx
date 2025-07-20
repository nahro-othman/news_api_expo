import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert, Text, TouchableOpacity } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { useBookmarks } from '../../application/providers/BookmarkProvider';
import { useSettings } from '../../application/providers/SettingsProvider';
import { ArticleCard } from '../components/ArticleCard';

export const BookmarksScreen: React.FC = () => {
  const navigation = useNavigation();
  const { bookmarks, clearAllBookmarks, loading } = useBookmarks();
  const { settings } = useSettings();
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'alphabetical'>('newest');

  const handleArticlePress = (article: any) => {
    navigation.navigate('ArticleDetail' as never, { article } as never);
  };

  const handleClearAll = () => {
    Alert.alert(
      'Clear All Bookmarks',
      'Are you sure you want to remove all bookmarked articles? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Clear All', 
          style: 'destructive',
          onPress: clearAllBookmarks
        },
      ]
    );
  };

  const getSortedBookmarks = () => {
    const sorted = [...bookmarks];
    
    switch (sortBy) {
      case 'newest':
        return sorted.sort((a, b) => 
          new Date((b as any).bookmarkedAt || b.publishedAt).getTime() - 
          new Date((a as any).bookmarkedAt || a.publishedAt).getTime()
        );
      case 'oldest':
        return sorted.sort((a, b) => 
          new Date((a as any).bookmarkedAt || a.publishedAt).getTime() - 
          new Date((b as any).bookmarkedAt || b.publishedAt).getTime()
        );
      case 'alphabetical':
        return sorted.sort((a, b) => a.title.localeCompare(b.title));
      default:
        return sorted;
    }
  };

  const renderSortOption = (option: 'newest' | 'oldest' | 'alphabetical', label: string) => (
    <TouchableOpacity
      style={[styles.sortButton, sortBy === option && styles.sortButtonActive]}
      onPress={() => setSortBy(option)}
    >
      <Text style={[styles.sortButtonText, sortBy === option && styles.sortButtonTextActive]}>
        {label}
      </Text>
    </TouchableOpacity>
  );

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      {/* Stats */}
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <MaterialIcons name="bookmark" size={20} color="#000000" />
          <Text style={styles.statText}>{bookmarks.length} Bookmarks</Text>
        </View>
      </View>

      {/* Sort Options */}
      {bookmarks.length > 0 && (
        <View style={styles.sortContainer}>
          <Text style={styles.sortLabel}>Sort by:</Text>
          <View style={styles.sortButtons}>
            {renderSortOption('newest', 'Newest')}
            {renderSortOption('oldest', 'Oldest')}
            {renderSortOption('alphabetical', 'A-Z')}
          </View>
        </View>
      )}

      {/* Clear All Button */}
      {bookmarks.length > 0 && (
        <TouchableOpacity style={styles.clearAllButton} onPress={handleClearAll}>
          <MaterialIcons name="delete-outline" size={18} color="#666666" />
          <Text style={styles.clearAllText}>Clear All Bookmarks</Text>
        </TouchableOpacity>
      )}
    </View>
  );

  const renderArticle = ({ item }: { item: any }) => (
    <ArticleCard 
      article={item} 
      onPress={() => handleArticlePress(item)}
      showImages={settings.showImages}
      compactView={settings.compactView}
      fontSize={settings.fontSize}
    />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <View style={styles.emptyIconContainer}>
        <MaterialIcons name="bookmark-border" size={64} color="#e0e0e0" />
      </View>
      <Text style={styles.emptyTitle}>No Bookmarks Yet</Text>
      <Text style={styles.emptySubtitle}>
        Start bookmarking articles you want to read later
      </Text>
      <View style={styles.emptyInstructions}>
        <View style={styles.instructionItem}>
          <MaterialIcons name="bookmark-add" size={16} color="#666666" />
          <Text style={styles.instructionText}>
            Tap the bookmark icon on any article to save it
          </Text>
        </View>
        <View style={styles.instructionItem}>
          <MaterialIcons name="visibility" size={16} color="#666666" />
          <Text style={styles.instructionText}>
            Access your saved articles anytime from this screen
          </Text>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading bookmarks...</Text>
      </View>
    );
  }

  const sortedBookmarks = getSortedBookmarks();

  return (
    <View style={styles.container}>
      <FlatList
        data={sortedBookmarks}
        renderItem={renderArticle}
        keyExtractor={(item) => item.url}
        ListHeaderComponent={renderHeader}
        ListEmptyComponent={renderEmptyState}
        contentContainerStyle={sortedBookmarks.length === 0 ? styles.emptyContainer : styles.listContainer}
        showsVerticalScrollIndicator={false}
        stickyHeaderIndices={sortedBookmarks.length > 0 ? [0] : undefined}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  loadingText: {
    marginTop: 16,
    fontSize: 16,
    color: '#666666',
    fontWeight: '600',
  },
  headerContainer: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 2,
    borderBottomColor: '#000000',
    paddingVertical: 16,
  },
  statsContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginLeft: 8,
  },
  sortContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sortLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    marginBottom: 8,
  },
  sortButtons: {
    flexDirection: 'row',
    gap: 8,
  },
  sortButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  sortButtonActive: {
    backgroundColor: '#000000',
  },
  sortButtonText: {
    fontSize: 11,
    fontWeight: '600',
    color: '#000000',
  },
  sortButtonTextActive: {
    color: '#ffffff',
  },
  clearAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
    paddingVertical: 8,
    marginHorizontal: 20,
    borderWidth: 1,
    borderColor: '#cccccc',
    backgroundColor: '#ffffff',
  },
  clearAllText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 6,
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
    paddingHorizontal: 40,
    backgroundColor: '#ffffff',
  },
  emptyIconContainer: {
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#666666',
    textAlign: 'center',
    marginBottom: 32,
    lineHeight: 22,
  },
  emptyInstructions: {
    width: '100%',
  },
  instructionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    backgroundColor: '#f8f8f8',
  },
  instructionText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 12,
    flex: 1,
    lineHeight: 18,
  },
}); 