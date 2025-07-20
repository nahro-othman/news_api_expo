import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { Article } from '../../domain/entities/Article';

interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
  showImages?: boolean;
  compactView?: boolean;
  fontSize?: 'small' | 'medium' | 'large';
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ 
  article, 
  onPress, 
  showImages = true,
  compactView = false,
  fontSize = 'medium'
}) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) {
      return 'Yesterday';
    } else if (diffDays <= 7) {
      return `${diffDays}d ago`;
    } else {
      return date.toLocaleDateString('en-US', {
        month: 'short',
        day: 'numeric',
      });
    }
  };

  const getFontSizes = () => {
    switch (fontSize) {
      case 'small':
        return {
          title: 14,
          description: 11,
          author: 10,
          date: 9,
          source: 9,
        };
      case 'large':
        return {
          title: 18,
          description: 15,
          author: 13,
          date: 11,
          source: 11,
        };
      default: // medium
        return {
          title: 16,
          description: 13,
          author: 11,
          date: 10,
          source: 10,
        };
    }
  };

  const fontSizes = getFontSizes();

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.8} style={compactView ? styles.compactContainer : styles.container}>
      <View style={styles.card}>
        <View style={compactView ? styles.compactCardContent : styles.cardContent}>
          
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.sourceContainer}>
              <View style={styles.sourceBadge}>
                <Text style={[styles.sourceText, { fontSize: fontSizes.source }]}>
                  {article.source.name.toUpperCase()}
                </Text>
              </View>
              {article.source.id && (
                <Text style={[styles.sourceId, { fontSize: fontSizes.source - 1 }]}>
                  #{article.source.id}
                </Text>
              )}
            </View>
            <View style={styles.dateContainer}>
              <Text style={[styles.dateText, { fontSize: fontSizes.date }]}>
                {formatDate(article.publishedAt)}
              </Text>
            </View>
          </View>

          {/* Content Layout */}
          <View style={styles.contentLayout}>
            
            {/* Text Content */}
            <View style={[styles.textContent, { paddingRight: (showImages && article.urlToImage) ? 12 : 0 }]}>
              <Text 
                style={[styles.title, { fontSize: fontSizes.title, lineHeight: fontSizes.title + 4 }]} 
                numberOfLines={compactView ? 2 : 3}
              >
                {article.title}
              </Text>
              
              {article.description && !compactView && (
                <Text 
                  style={[styles.description, { fontSize: fontSizes.description, lineHeight: fontSizes.description + 4 }]} 
                  numberOfLines={2}
                >
                  {article.description}
                </Text>
              )}

              {/* Author */}
              {article.author && !compactView && (
                <View style={styles.authorContainer}>
                  <Text style={[styles.authorText, { fontSize: fontSizes.author }]} numberOfLines={1}>
                    By {article.author}
                  </Text>
                </View>
              )}
            </View>

            {/* Image */}
            {showImages && article.urlToImage && (
              <View style={compactView ? styles.compactImageContainer : styles.imageContainer}>
                <Image 
                  source={{ uri: article.urlToImage }} 
                  style={styles.image}
                  resizeMode="cover"
                />
              </View>
            )}
          </View>

          {/* Footer */}
          {!compactView && (
            <View style={styles.footer}>
              <View style={styles.readMoreContainer}>
                <Text style={styles.readMoreText}>Read Full Article</Text>
                <MaterialIcons name="arrow-forward" size={12} color="#000000" />
              </View>
            </View>
          )}
          
        </View>
      </View>
    </TouchableOpacity>
  );
};

const { width } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 16,
    marginVertical: 8,
  },
  compactContainer: {
    marginHorizontal: 16,
    marginVertical: 4,
  },
  card: {
    backgroundColor: '#ffffff',
    borderWidth: 2,
    borderColor: '#000000',
  },
  cardContent: {
    padding: 20,
  },
  compactCardContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  sourceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  sourceBadge: {
    backgroundColor: '#000000',
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  sourceText: {
    color: '#ffffff',
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  sourceId: {
    color: '#999999',
    marginLeft: 8,
    fontWeight: '500',
  },
  dateContainer: {
    alignItems: 'flex-end',
  },
  dateText: {
    color: '#666666',
    fontWeight: '600',
    letterSpacing: 0.3,
  },
  contentLayout: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  textContent: {
    flex: 1,
  },
  title: {
    fontWeight: '700',
    marginBottom: 8,
    color: '#000000',
    letterSpacing: -0.2,
  },
  description: {
    color: '#555555',
    marginBottom: 12,
    letterSpacing: -0.1,
  },
  authorContainer: {
    marginTop: 4,
  },
  authorText: {
    color: '#666666',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  imageContainer: {
    width: 100,
    height: 80,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000000',
  },
  compactImageContainer: {
    width: 80,
    height: 60,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#000000',
  },
  image: {
    width: '100%',
    height: '100%',
  },
  footer: {
    marginTop: 16,
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#000000',
  },
  readMoreContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  readMoreText: {
    fontSize: 11,
    color: '#000000',
    fontWeight: '700',
    marginRight: 6,
    letterSpacing: 0.5,
  },
}); 