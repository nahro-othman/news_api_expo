import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { Card, Title, Paragraph } from 'react-native-paper';
import { Article } from '../../domain/entities/Article';

interface ArticleCardProps {
  article: Article;
  onPress?: () => void;
}

export const ArticleCard: React.FC<ArticleCardProps> = ({ article, onPress }) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  return (
    <TouchableOpacity onPress={onPress} activeOpacity={0.9}>
      <Card style={styles.card}>
        {article.urlToImage && (
          <Card.Cover source={{ uri: article.urlToImage }} style={styles.image} />
        )}
        <Card.Content style={styles.content}>
          <Title style={styles.title} numberOfLines={2}>
            {article.title}
          </Title>
          <Paragraph style={styles.description} numberOfLines={3}>
            {article.description}
          </Paragraph>
          <View style={styles.meta}>
            <Text style={styles.source}>{article.source.name}</Text>
            <Text style={styles.date}>{formatDate(article.publishedAt)}</Text>
          </View>
          {article.author && (
            <Text style={styles.author}>By {article.author}</Text>
          )}
        </Card.Content>
      </Card>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    marginHorizontal: 16,
    marginVertical: 8,
    elevation: 0,
    borderRadius: 0,
    backgroundColor: '#ffffff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  image: {
    height: 200,
    borderRadius: 0,
  },
  content: {
    padding: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    color: '#000000',
  },
  description: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 12,
    lineHeight: 20,
  },
  meta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  source: {
    fontSize: 12,
    color: '#000000',
    fontWeight: '500',
  },
  date: {
    fontSize: 12,
    color: '#999999',
  },
  author: {
    fontSize: 12,
    color: '#666666',
    fontStyle: 'italic',
  },
}); 