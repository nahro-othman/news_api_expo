import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import { MaterialIcons } from '@expo/vector-icons';
import { HomeScreen } from '../screens/HomeScreen';
import { SearchScreen } from '../screens/SearchScreen';
import { ArticleDetailScreen } from '../screens/ArticleDetailScreen';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

const HomeStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Home" 
      component={HomeScreen}
      options={{
        title: 'News Headlines',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    />
    <Stack.Screen 
      name="ArticleDetail" 
      component={ArticleDetailScreen}
      options={{
        title: 'Article',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    />
  </Stack.Navigator>
);

const SearchStack = () => (
  <Stack.Navigator>
    <Stack.Screen 
      name="Search" 
      component={SearchScreen}
      options={{
        title: 'Search News',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    />
    <Stack.Screen 
      name="ArticleDetail" 
      component={ArticleDetailScreen}
      options={{
        title: 'Article',
        headerStyle: {
          backgroundColor: '#ffffff',
          borderBottomWidth: 1,
          borderBottomColor: '#e0e0e0',
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTintColor: '#000000',
        headerTitleStyle: {
          fontWeight: '600',
          fontSize: 18,
        },
      }}
    />
  </Stack.Navigator>
);

export const AppNavigator: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof MaterialIcons.glyphMap;

            if (route.name === 'HomeTab') {
              iconName = 'home';
            } else if (route.name === 'SearchTab') {
              iconName = 'search';
            } else {
              iconName = 'article';
            }

            return <MaterialIcons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: '#000000',
          tabBarInactiveTintColor: '#999999',
          tabBarStyle: {
            backgroundColor: '#ffffff',
            borderTopWidth: 1,
            borderTopColor: '#e0e0e0',
            elevation: 0,
            shadowOpacity: 0,
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },
          tabBarLabelStyle: {
            fontWeight: '500',
            fontSize: 12,
          },
          headerShown: false,
        })}
      >
        <Tab.Screen 
          name="HomeTab" 
          component={HomeStack}
          options={{ title: 'Headlines' }}
        />
        <Tab.Screen 
          name="SearchTab" 
          component={SearchStack}
          options={{ title: 'Search' }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}; 