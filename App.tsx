import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Provider as PaperProvider, MD3LightTheme } from 'react-native-paper';
import { NewsProvider } from './src/application/providers/NewsProvider';
import { SettingsProvider } from './src/application/providers/SettingsProvider';
import { AppNavigator } from './src/presentation/navigation/AppNavigator';
import { SplashScreen } from './src/presentation/components/SplashScreen';

const cleanTheme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: '#000000',
    onPrimary: '#ffffff',
    surface: '#ffffff',
    onSurface: '#000000',
    background: '#ffffff',
    onBackground: '#000000',
    surfaceVariant: '#ffffff',
    onSurfaceVariant: '#666666',
    outline: '#000000',
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  const handleSplashFinish = () => {
    setIsLoading(false);
  };

  if (isLoading) {
    return <SplashScreen onFinish={handleSplashFinish} />;
  }

  return (
    <PaperProvider theme={cleanTheme}>
      <SettingsProvider>
        <NewsProvider>
          <AppNavigator />
          <StatusBar style="dark" backgroundColor="#ffffff" />
        </NewsProvider>
      </SettingsProvider>
    </PaperProvider>
  );
}
