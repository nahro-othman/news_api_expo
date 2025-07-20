import React, { useState } from 'react';
import { 
  View, 
  ScrollView, 
  StyleSheet, 
  Alert, 
  TouchableOpacity,
  Text,
  Switch
} from 'react-native';
import { 
  Modal, 
  Portal,
  ActivityIndicator 
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useSettings, UserSettings } from '../../application/providers/SettingsProvider';

const countries = [
  { id: 'us', label: 'United States' },
  { id: 'gb', label: 'United Kingdom' },
  { id: 'ca', label: 'Canada' },
  { id: 'au', label: 'Australia' },
  { id: 'de', label: 'Germany' },
  { id: 'fr', label: 'France' },
  { id: 'jp', label: 'Japan' },
  { id: 'in', label: 'India' },
  { id: 'br', label: 'Brazil' },
  { id: 'mx', label: 'Mexico' },
];

const categories = [
  { id: 'general', label: 'General' },
  { id: 'business', label: 'Business' },
  { id: 'technology', label: 'Technology' },
  { id: 'sports', label: 'Sports' },
  { id: 'entertainment', label: 'Entertainment' },
  { id: 'health', label: 'Health' },
  { id: 'science', label: 'Science' },
];

const sortOptions = [
  { id: 'publishedAt', label: 'Latest First' },
  { id: 'relevancy', label: 'Most Relevant' },
  { id: 'popularity', label: 'Most Popular' },
];

const fontSizes = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

const imageQualities = [
  { id: 'low', label: 'Low (Faster loading)' },
  { id: 'medium', label: 'Medium (Balanced)' },
  { id: 'high', label: 'High (Best quality)' },
];

const refreshIntervals = [
  { id: 15, label: '15 minutes' },
  { id: 30, label: '30 minutes' },
  { id: 60, label: '1 hour' },
  { id: 120, label: '2 hours' },
];

const articlesPerPageOptions = [
  { id: 10, label: '10 articles' },
  { id: 20, label: '20 articles' },
  { id: 30, label: '30 articles' },
  { id: 50, label: '50 articles' },
];

export const SettingsScreen: React.FC = () => {
  const { settings, updateSetting, resetSettings, loading } = useSettings();
  const [modalVisible, setModalVisible] = useState<string | null>(null);

  const handleResetSettings = () => {
    Alert.alert(
      'Reset Settings',
      'Are you sure you want to reset all settings to default values?',
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Reset', 
          style: 'destructive',
          onPress: resetSettings
        },
      ]
    );
  };

  const renderListItem = (
    title: string,
    description: string,
    icon: string,
    onPress?: () => void,
    rightComponent?: React.ReactNode
  ) => (
    <TouchableOpacity
      style={styles.listItem}
      onPress={onPress}
      disabled={!onPress}
    >
      <View style={styles.listItemContent}>
        <View style={styles.listItemLeft}>
          <View style={styles.iconContainer}>
            <MaterialIcons name={icon as any} size={20} color="#000000" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.listItemTitle}>{title}</Text>
            <Text style={styles.listItemDescription}>{description}</Text>
          </View>
        </View>
        <View style={styles.listItemRight}>
          {rightComponent}
          {onPress && (
            <MaterialIcons name="keyboard-arrow-right" size={20} color="#666666" />
          )}
        </View>
      </View>
    </TouchableOpacity>
  );

  const renderSwitch = (value: boolean, onValueChange: (value: boolean) => void) => (
    <Switch
      value={value}
      onValueChange={onValueChange}
      trackColor={{ false: '#e0e0e0', true: '#000000' }}
      thumbColor={value ? '#ffffff' : '#ffffff'}
      ios_backgroundColor="#e0e0e0"
    />
  );

  const renderModal = (
    title: string,
    options: Array<{id: any, label: string}>,
    currentValue: any,
    onSelect: (value: any) => void
  ) => (
    <Portal>
      <Modal
        visible={modalVisible === title}
        onDismiss={() => setModalVisible(null)}
        contentContainerStyle={styles.modalContent}
      >
        <View style={styles.modalHeader}>
          <Text style={styles.modalTitle}>{title}</Text>
          <TouchableOpacity onPress={() => setModalVisible(null)}>
            <MaterialIcons name="close" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
        <View style={styles.modalDivider} />
        <ScrollView style={styles.modalScroll}>
          {options.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.modalOption,
                currentValue === option.id && styles.selectedModalOption
              ]}
              onPress={() => {
                onSelect(option.id);
                setModalVisible(null);
              }}
            >
              <Text style={[
                styles.modalOptionText,
                currentValue === option.id && styles.selectedModalOptionText
              ]}>
                {option.label}
              </Text>
              {currentValue === option.id && (
                <MaterialIcons name="check" size={20} color="#ffffff" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Modal>
    </Portal>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#000000" />
        <Text style={styles.loadingText}>Loading settings...</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      
      {/* News Preferences */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>NEWS PREFERENCES</Text>
        
        {renderListItem(
          'Default Country',
          countries.find(c => c.id === settings.defaultCountry)?.label || 'Not Set',
          'public',
          () => setModalVisible('Default Country')
        )}

        {renderListItem(
          'Default Category',
          categories.find(c => c.id === settings.defaultCategory)?.label || 'Not Set',
          'category',
          () => setModalVisible('Default Category')
        )}

        {renderListItem(
          'Default Sort Order',
          sortOptions.find(s => s.id === settings.defaultSortBy)?.label || 'Not Set',
          'sort',
          () => setModalVisible('Default Sort Order')
        )}

        {renderListItem(
          'Articles Per Page',
          `${settings.articlesPerPage} articles`,
          'format-list-numbered',
          () => setModalVisible('Articles Per Page')
        )}
      </View>

      {/* Display Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>DISPLAY SETTINGS</Text>

        {renderListItem(
          'Show Images',
          'Display article images',
          'image',
          undefined,
          renderSwitch(settings.showImages, (value) => updateSetting('showImages', value))
        )}

        {renderListItem(
          'Image Quality',
          imageQualities.find(q => q.id === settings.imageQuality)?.label || 'Not Set',
          'high-definition',
          settings.showImages ? () => setModalVisible('Image Quality') : undefined
        )}

        {renderListItem(
          'Compact View',
          'Show more articles in less space',
          'view-compact',
          undefined,
          renderSwitch(settings.compactView, (value) => updateSetting('compactView', value))
        )}

        {renderListItem(
          'Font Size',
          fontSizes.find(f => f.id === settings.fontSize)?.label || 'Not Set',
          'format-size',
          () => setModalVisible('Font Size')
        )}
      </View>

      {/* Auto-Refresh Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>AUTO-REFRESH</Text>

        {renderListItem(
          'Auto-Refresh',
          'Automatically refresh news articles',
          'refresh',
          undefined,
          renderSwitch(settings.autoRefresh, (value) => updateSetting('autoRefresh', value))
        )}

        {renderListItem(
          'Refresh Interval',
          refreshIntervals.find(r => r.id === settings.refreshInterval)?.label || 'Not Set',
          'timer',
          settings.autoRefresh ? () => setModalVisible('Refresh Interval') : undefined
        )}
      </View>

      {/* Features */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>FEATURES</Text>

        {renderListItem(
          'Notifications',
          'Get notified about breaking news',
          'notifications',
          undefined,
          renderSwitch(settings.notifications, (value) => updateSetting('notifications', value))
        )}

        {renderListItem(
          'Offline Reading',
          'Save articles for offline reading',
          'cloud-download',
          undefined,
          renderSwitch(settings.offlineReading, (value) => updateSetting('offlineReading', value))
        )}
      </View>

      {/* Reset Settings */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>RESET</Text>
        
        {renderListItem(
          'Reset All Settings',
          'Restore default settings',
          'restore',
          handleResetSettings
        )}
      </View>

      {/* App Info */}
      <View style={styles.appInfo}>
        <View style={styles.appInfoContent}>
          <Text style={styles.appInfoTitle}>NEWS APP</Text>
          <Text style={styles.appInfoVersion}>Version 1.0.0</Text>
          <Text style={styles.appInfoSubtext}>Built with React Native & Expo</Text>
        </View>
      </View>

      {/* Modals */}
      {renderModal(
        'Default Country',
        countries,
        settings.defaultCountry,
        (value) => updateSetting('defaultCountry', value)
      )}

      {renderModal(
        'Default Category',
        categories,
        settings.defaultCategory,
        (value) => updateSetting('defaultCategory', value)
      )}

      {renderModal(
        'Default Sort Order',
        sortOptions,
        settings.defaultSortBy,
        (value) => updateSetting('defaultSortBy', value)
      )}

      {renderModal(
        'Font Size',
        fontSizes,
        settings.fontSize,
        (value) => updateSetting('fontSize', value)
      )}

      {renderModal(
        'Image Quality',
        imageQualities,
        settings.imageQuality,
        (value) => updateSetting('imageQuality', value)
      )}

      {renderModal(
        'Refresh Interval',
        refreshIntervals,
        settings.refreshInterval,
        (value) => updateSetting('refreshInterval', value)
      )}

      {renderModal(
        'Articles Per Page',
        articlesPerPageOptions,
        settings.articlesPerPage,
        (value) => updateSetting('articlesPerPage', value)
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
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
  section: {
    marginVertical: 16,
  },
  sectionTitle: {
    fontSize: 12,
    fontWeight: '700',
    color: '#000000',
    paddingHorizontal: 20,
    paddingBottom: 12,
    letterSpacing: 1,
  },
  listItem: {
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  listItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  listItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  iconContainer: {
    width: 32,
    alignItems: 'center',
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  listItemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
    marginBottom: 2,
  },
  listItemDescription: {
    fontSize: 14,
    color: '#666666',
    fontWeight: '400',
  },
  listItemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#ffffff',
    margin: 32,
    maxHeight: '70%',
    borderWidth: 3,
    borderColor: '#000000',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 24,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
  },
  modalDivider: {
    height: 2,
    backgroundColor: '#000000',
  },
  modalScroll: {
    maxHeight: 400,
  },
  modalOption: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
    backgroundColor: '#ffffff',
  },
  selectedModalOption: {
    backgroundColor: '#000000',
    borderBottomColor: '#333333',
  },
  modalOptionText: {
    fontSize: 16,
    color: '#000000',
    fontWeight: '500',
  },
  selectedModalOptionText: {
    color: '#ffffff',
    fontWeight: '600',
  },
  appInfo: {
    marginTop: 32,
    marginBottom: 32,
  },
  appInfoContent: {
    alignItems: 'center',
    paddingVertical: 24,
    borderTopWidth: 2,
    borderBottomWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  appInfoTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 2,
    marginBottom: 4,
  },
  appInfoVersion: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 8,
  },
  appInfoSubtext: {
    fontSize: 12,
    color: '#999999',
    fontWeight: '400',
  },
}); 