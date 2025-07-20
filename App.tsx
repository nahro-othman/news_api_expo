import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { Container } from './src/infrastructure/di/Container';
import { NewsProvider } from './src/application/providers/NewsProvider';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';

const cleanTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000',
    onPrimary: '#ffffff',
    surface: '#ffffff',
    onSurface: '#000000',
    background: '#f8f8f8',
    onBackground: '#000000',
    surfaceVariant: '#f8f8f8',
    onSurfaceVariant: '#666666',
    outline: '#e0e0e0',
  },
};

export default function App() {
  const container = Container.getInstance();
  const newsService = container.getNewsService();

  return (
    <PaperProvider theme={cleanTheme}>
      <NewsProvider newsService={newsService}>
        <AppNavigator />
        <StatusBar style="dark" />
      </NewsProvider>
    </PaperProvider>
  );
}
