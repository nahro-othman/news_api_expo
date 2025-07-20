import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface UserSettings {
  defaultCountry: string;
  defaultCategory: string;
  defaultSortBy: 'relevancy' | 'popularity' | 'publishedAt';
  articlesPerPage: number;
  autoRefresh: boolean;
  refreshInterval: number; // in minutes
  imageQuality: 'low' | 'medium' | 'high';
  showImages: boolean;
  compactView: boolean;
  darkMode: boolean;
  notifications: boolean;
  offlineReading: boolean;
  fontSize: 'small' | 'medium' | 'large';
  language: string;
}

const defaultSettings: UserSettings = {
  defaultCountry: 'us',
  defaultCategory: 'general',
  defaultSortBy: 'publishedAt',
  articlesPerPage: 20,
  autoRefresh: false,
  refreshInterval: 30,
  imageQuality: 'medium',
  showImages: true,
  compactView: false,
  darkMode: false,
  notifications: true,
  offlineReading: false,
  fontSize: 'medium',
  language: 'en',
};

interface SettingsContextType {
  settings: UserSettings;
  updateSetting: <K extends keyof UserSettings>(key: K, value: UserSettings[K]) => Promise<void>;
  resetSettings: () => Promise<void>;
  loading: boolean;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

const SETTINGS_STORAGE_KEY = '@news_app_settings';

interface SettingsProviderProps {
  children: ReactNode;
}

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ children }) => {
  const [settings, setSettings] = useState<UserSettings>(defaultSettings);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const storedSettings = await AsyncStorage.getItem(SETTINGS_STORAGE_KEY);
      if (storedSettings) {
        const parsedSettings = JSON.parse(storedSettings);
        // Merge with default settings to ensure new settings are included
        setSettings({ ...defaultSettings, ...parsedSettings });
      }
    } catch (error) {
      console.error('Error loading settings:', error);
    } finally {
      setLoading(false);
    }
  };

  const saveSettings = async (newSettings: UserSettings) => {
    try {
      await AsyncStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(newSettings));
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const updateSetting = async <K extends keyof UserSettings>(
    key: K, 
    value: UserSettings[K]
  ) => {
    const newSettings = { ...settings, [key]: value };
    setSettings(newSettings);
    await saveSettings(newSettings);
  };

  const resetSettings = async () => {
    setSettings(defaultSettings);
    await saveSettings(defaultSettings);
  };

  const contextValue: SettingsContextType = {
    settings,
    updateSetting,
    resetSettings,
    loading,
  };

  return (
    <SettingsContext.Provider value={contextValue}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
}; 