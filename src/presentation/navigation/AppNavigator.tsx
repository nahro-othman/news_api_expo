import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';
import { SettingsScreen } from '../screens/SettingsScreen';
import { BookmarksScreen } from '../screens/BookmarksScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

// Custom Header Component
const CustomHeader = ({ 
  title, 
  showIcon = false, 
  showBackButton = false, 
  onBackPress 
}: { 
  title: string; 
  showIcon?: boolean; 
  showBackButton?: boolean;
  onBackPress?: () => void;
}) => (
  <View style={styles.headerContainer}>
    <View style={styles.headerContent}>
      {showBackButton && (
        <TouchableOpacity 
          style={styles.backButton}
          onPress={onBackPress}
          activeOpacity={0.7}
        >
          <MaterialIcons name="arrow-back" size={24} color="#000000" />
        </TouchableOpacity>
      )}
      
      {showIcon && (
        <View style={styles.headerIconContainer}>
          <Image 
            source={require('../../../assets/icon.png')} 
            style={styles.headerIcon}
            resizeMode="contain"
          />
        </View>
      )}
      
      <View style={[styles.headerTextContainer, showBackButton && styles.headerTextWithBack]}>
        <Text style={styles.headerTitle}>{title}</Text>
        <Text style={styles.headerSubtitle}>NEWS APP</Text>
      </View>
    </View>
    <View style={styles.headerDivider} />
  </View>
);

// Custom Tab Bar Icon Component
const TabBarIcon = ({ name, focused, size }: { name: string; focused: boolean; size: number }) => (
  <View style={[styles.tabIconContainer, focused && styles.tabIconContainerFocused]}>
    <MaterialIcons 
      name={name as any} 
      size={size} 
      color={focused ? '#ffffff' : '#000000'} 
    />
  </View>
);

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        header: () => <CustomHeader title="Headlines" showIcon={true} />
      }}
    />
    <Stack.Screen 
      name="ArticleDetail" 
      component={ArticleDetailScreen}
      options={({ navigation }) => ({
        header: () => (
          <CustomHeader 
            title="Article" 
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
          />
        )
      })}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Search" 
      component={SearchScreen}
      options={{
        header: () => <CustomHeader title="Search" />
      }}
    />
    <Stack.Screen 
      name="ArticleDetail" 
      component={ArticleDetailScreen}
      options={({ navigation }) => ({
        header: () => (
          <CustomHeader 
            title="Article" 
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
          />
        )
      })}
    />
  </Stack.Navigator>
);

const BookmarksStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Bookmarks" 
      component={BookmarksScreen}
      options={{
        header: () => <CustomHeader title="Bookmarks" />
      }}
    />
    <Stack.Screen 
      name="ArticleDetail" 
      component={ArticleDetailScreen}
      options={({ navigation }) => ({
        header: () => (
          <CustomHeader 
            title="Article" 
            showBackButton={true}
            onBackPress={() => navigation.goBack()}
          />
        )
      })}
    />
  </Stack.Navigator>
);

const SettingsStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Settings" 
      component={SettingsScreen}
      options={{
        header: () => <CustomHeader title="Settings" />
      }}
    />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, size }) => {
            let iconName: string;

            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'SearchTab') {
              iconName = 'search';
            } else if (route.name === 'BookmarksTab') {
              iconName = 'bookmark';
            } else if (route.name === 'SettingsTab') {
              iconName = 'settings';
            } else {
              iconName = 'article';
            }

            return <TabBarIcon name={iconName} focused={focused} size={size} />;
          },
          tabBarActiveTintColor: '#ffffff',
          tabBarInactiveTintColor: '#000000',
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          headerShown: false,
          tabBarItemStyle: styles.tabBarItem,
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack}
          options={{ 
            title: 'HEADLINES',
            tabBarLabel: ({ focused }) => (
              <Text style={[
                styles.tabBarLabelText,
                focused && styles.tabBarLabelTextFocused
              ]}>
                HEADLINES
              </Text>
            )
          }}
        />
        <Tab.Screen 
          name="SearchTab" 
          component={SearchStack}
          options={{ 
            title: 'SEARCH',
            tabBarLabel: ({ focused }) => (
              <Text style={[
                styles.tabBarLabelText,
                focused && styles.tabBarLabelTextFocused
              ]}>
                SEARCH
              </Text>
            )
          }}
        />
        <Tab.Screen 
          name="BookmarksTab" 
          component={BookmarksStack}
          options={{ 
            title: 'BOOKMARKS',
            tabBarLabel: ({ focused }) => (
              <Text style={[
                styles.tabBarLabelText,
                focused && styles.tabBarLabelTextFocused
              ]}>
                BOOKMARKS
              </Text>
            )
          }}
        />
        <Tab.Screen 
          name="SettingsTab" 
          component={SettingsStack}
          options={{ 
            title: 'SETTINGS',
            tabBarLabel: ({ focused }) => (
              <Text style={[
                styles.tabBarLabelText,
                focused && styles.tabBarLabelTextFocused
              ]}>
                SETTINGS
              </Text>
            )
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  // Header Styles
  headerContainer: {
    backgroundColor: '#ffffff',
    paddingTop: 50, // Account for status bar
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerIconContainer: {
    width: 40,
    height: 40,
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 16,
  },
  headerIcon: {
    width: 28,
    height: 28,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTextWithBack: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 1,
  },
  headerSubtitle: {
    fontSize: 10,
    fontWeight: '600',
    color: '#666666',
    letterSpacing: 2,
    marginTop: 2,
  },
  headerDivider: {
    height: 3,
    backgroundColor: '#000000',
  },
  
  // Tab Bar Styles
  tabBar: {
    backgroundColor: '#ffffff',
    borderTopWidth: 3,
    borderTopColor: '#000000',
    height: 70,
    paddingBottom: 8,
    paddingTop: 8,
  },
  tabBarItem: {
    paddingVertical: 4,
  },
  tabBarLabel: {
    display: 'none', // Hide default label
  },
  tabBarLabelText: {
    fontSize: 8,
    fontWeight: '700',
    color: '#000000',
    letterSpacing: 0.5,
    marginTop: 4,
  },
  tabBarLabelTextFocused: {
    color: '#ffffff',
  },
  
  // Tab Icon Styles
  tabIconContainer: {
    width: 36,
    height: 36,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 2,
    borderColor: '#000000',
    backgroundColor: '#ffffff',
  },
  tabIconContainerFocused: {
    backgroundColor: '#000000',
  },
}); 