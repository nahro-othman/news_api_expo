import React from 'react';
import { View, ScrollView, Text, Image, StyleSheet, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Article } from '../../domain/entities/Article';

interface Props {
  route: {
    params: {
      article: Article;
    };
  };
}

export const ArticleDetailScreen: React.FC<Props> = ({ route }) => {
  const { article } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatContent = (content: string | null) => {
    if (!content) return null;
    
    // Remove the common "[+XXX chars]" suffix from content
    const cleanContent = content.replace(/\[\+\d+\s+chars\]$/, '').trim();
    return cleanContent;
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      
      {/* Header Section */}
      <View style={styles.header}>
        <View style={styles.sourceContainer}>
          <View style={styles.sourceBadge}>
            <Text style={styles.sourceText}>
              {article.source.name.toUpperCase()}
            </Text>
          </View>
          {article.source.id && (
            <Text style={styles.sourceId}>#{article.source.id}</Text>
          )}
        </View>
        
        <View style={styles.dateContainer}>
          <MaterialIcons name="schedule" size={16} color="#666666" />
          <Text style={styles.dateText}>{formatDate(article.publishedAt)}</Text>
        </View>
      </View>

      {/* Title */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>{article.title}</Text>
      </View>

      {/* Author */}
      {article.author && (
        <View style={styles.authorContainer}>
          <MaterialIcons name="person" size={16} color="#666666" />
          <Text style={styles.authorText}>By {article.author}</Text>
        </View>
      )}

      {/* Image */}
      {article.urlToImage && (
        <View style={styles.imageContainer}>
          <Image 
            source={{ uri: article.urlToImage }} 
            style={styles.image}
            resizeMode="cover"
          />
        </View>
      )}

      {/* Description */}
      {article.description && (
        <View style={styles.descriptionContainer}>
          <Text style={styles.descriptionLabel}>SUMMARY</Text>
          <Text style={styles.description}>{article.description}</Text>
        </View>
      )}

      {/* Content */}
      {article.content && formatContent(article.content) && (
        <View style={styles.contentContainer}>
          <Text style={styles.contentLabel}>ARTICLE CONTENT</Text>
          <Text style={styles.content}>{formatContent(article.content)}</Text>
        </View>
      )}

      {/* URL Info */}
      <View style={styles.urlContainer}>
        <Text style={styles.urlLabel}>SOURCE URL</Text>
        <View style={styles.urlBox}>
          <MaterialIcons name="link" size={16} color="#666666" />
          <Text style={styles.urlText} numberOfLines={2}>
            {article.url}
          </Text>
        </View>
        <Text style={styles.urlNote}>
          Note: URLs are not opened in this app for security and privacy reasons.
        </Text>
      </View>

      {/* Article Details */}
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsLabel}>ARTICLE DETAILS</Text>
        
        <View style={styles.detailRow}>
          <Text style={styles.detailKey}>Source:</Text>
          <Text style={styles.detailValue}>{article.source.name}</Text>
        </View>
        
        {article.source.id && (
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Source ID:</Text>
            <Text style={styles.detailValue}>{article.source.id}</Text>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <Text style={styles.detailKey}>Published:</Text>
          <Text style={styles.detailValue}>{formatDate(article.publishedAt)}</Text>
        </View>
        
        {article.author && (
          <View style={styles.detailRow}>
            <Text style={styles.detailKey}>Author:</Text>
            <Text style={styles.detailValue}>{article.author}</Text>
          </View>
        )}
        
        <View style={styles.detailRow}>
          <Text style={styles.detailKey}>Has Image:</Text>
          <Text style={styles.detailValue}>{article.urlToImage ? 'Yes' : 'No'}</Text>
        </View>
      </View>

      {/* Footer */}
      <View style={styles.footer}>
        <Text style={styles.footerText}>
          This article is displayed for reading purposes only. External links are not opened for security.
        </Text>
      </View>

    </ScrollView>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  sourceText: {
    color: '#ffffff',
    fontSize: 12,
    fontWeight: '700',
    letterSpacing: 1,
  },
  sourceId: {
    fontSize: 11,
    color: '#999999',
    marginLeft: 12,
    fontWeight: '500',
  },
  dateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flexShrink: 1,
  },
  dateText: {
    fontSize: 12,
    color: '#666666',
    marginLeft: 6,
    fontWeight: '500',
  },
  titleContainer: {
    padding: 20,
    paddingBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    lineHeight: 32,
    letterSpacing: -0.5,
  },
  authorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  authorText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    fontWeight: '500',
    fontStyle: 'italic',
  },
  imageContainer: {
    marginHorizontal: 20,
    marginBottom: 24,
    borderWidth: 2,
    borderColor: '#000000',
  },
  image: {
    width: '100%',
    height: 200,
  },
  descriptionContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  descriptionLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    lineHeight: 24,
    color: '#333333',
    fontWeight: '400',
  },
  contentContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  contentLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    marginBottom: 12,
  },
  content: {
    fontSize: 16,
    lineHeight: 26,
    color: '#000000',
    fontWeight: '400',
  },
  urlContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  urlLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    marginBottom: 12,
  },
  urlBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    padding: 16,
    backgroundColor: '#f8f8f8',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  urlText: {
    fontSize: 14,
    color: '#666666',
    marginLeft: 8,
    flex: 1,
    fontFamily: 'monospace',
  },
  urlNote: {
    fontSize: 12,
    color: '#999999',
    marginTop: 8,
    fontStyle: 'italic',
  },
  detailsContainer: {
    paddingHorizontal: 20,
    marginBottom: 24,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    paddingTop: 24,
  },
  detailsLabel: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
    marginBottom: 16,
  },
  detailRow: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  detailKey: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    width: 100,
  },
  detailValue: {
    fontSize: 14,
    color: '#000000',
    flex: 1,
    fontWeight: '400',
  },
  footer: {
    padding: 20,
    borderTopWidth: 2,
    borderTopColor: '#000000',
    backgroundColor: '#f8f8f8',
    marginTop: 20,
  },
  footerText: {
    fontSize: 12,
    color: '#666666',
    textAlign: 'center',
    fontStyle: 'italic',
  },
}); 
 