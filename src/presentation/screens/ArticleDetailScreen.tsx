import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Title, Paragraph, Divider } from 'react-native-paper';
import { Article } from '../../domain/entities/Article';

interface ArticleDetailScreenProps {
  route: {
    params: {
      article: Article;
    };
  };
}

export const ArticleDetailScreen: React.FC<ArticleDetailScreenProps> = ({ route }) => {
  const { article } = route.params;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatContent = (content: string) => {
    if (!content) return '';
    // Remove the "[+X chars]" pattern that appears at the end of truncated content
    return content.replace(/\s*\[\+\d+\s*chars\]$/, '');
  };

  return (
    <ScrollView style={styles.container}>
      {article.urlToImage && (
        <Image 
          source={{ uri: article.urlToImage }} 
          style={styles.image}
          resizeMode="cover"
        />
      )}
      
      <View style={styles.content}>
        <Title style={styles.title}>
          {article.title}
        </Title>
        
        <View style={styles.meta}>
          <Text style={styles.source}>{article.source.name}</Text>
          <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
        </View>
        
        {article.author && (
          <Text style={styles.author}>By {article.author}</Text>
        )}
        
        <Divider style={styles.divider} />
        
        <Paragraph style={styles.description}>
          {article.description}
        </Paragraph>
        
        {article.content && (
          <View style={styles.contentSection}>
            <Title style={styles.contentTitle}>Full Article</Title>
            <Paragraph style={styles.fullContent}>
              {formatContent(article.content)}
            </Paragraph>
          </View>
        )}
        
        <View style={styles.footer}>
          <Text style={styles.footerText}>
            Source: {article.source.name}
          </Text>
          <Text style={styles.footerText}>
            Published: {formatDate(article.publishedAt)}
          </Text>
        </View>
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
  image: {
    width: width,
    height: 250,
  },
  content: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: '#000000',
    lineHeight: 32,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  source: {
    fontSize: 14,
    color: '#000000',
    fontWeight: '600',
  },
  date: {
    fontSize: 14,
    color: '#666666',
  },
  author: {
    fontSize: 14,
    color: '#666666',
    fontStyle: 'italic',
    marginBottom: 16,
  },
  divider: {
    marginVertical: 16,
    backgroundColor: '#e0e0e0',
    height: 1,
  },
  description: {
    fontSize: 16,
    color: '#333333',
    lineHeight: 24,
    marginBottom: 24,
  },
  contentSection: {
    marginTop: 16,
  },
  contentTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 12,
    color: '#000000',
  },
  fullContent: {
    fontSize: 15,
    color: '#333333',
    lineHeight: 24,
  },
  footer: {
    marginTop: 32,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  footerText: {
    fontSize: 12,
    color: '#999999',
    marginBottom: 4,
  },
}); 