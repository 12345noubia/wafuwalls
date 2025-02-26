import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Animated,
  Dimensions,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider as PaperProvider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/Ionicons';

// Screens
import HomeScreen from './src/screens/HomeScreen';
import SearchScreen from './src/screens/SearchScreen';
import FavoritesScreen from './src/screens/FavoritesScreen';
import ProfileScreen from './src/screens/ProfileScreen';

const Tab = createBottomTabNavigator();
const { width } = Dimensions.get('window');

// Theme Configuration
const MyTheme = {
  dark: true,
  colors: {
    primary: '#EF233C',
    background: '#121212',
    card: '#1E1E1E',
    text: '#ffffff',
    border: '#2E2E2E',
  },
};

// Custom Tab Bar with floating bubble effect
function CustomTabBar({ state, descriptors, navigation }) {
  const translateY = useRef(new Animated.Value(100)).current;

  useEffect(() => {
    Animated.spring(translateY, {
      toValue: 0,
      tension: 10,
      friction: 2,
      useNativeDriver: true,
    }).start();
  }, []);

  return (
    <Animated.View style={[styles.tabBar, { transform: [{ translateY }] }]}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.index === index;

        let iconName;
        switch (route.name) {
          case 'Home':
            iconName = 'planet';
            break;
          case 'Search':
            iconName = 'search';
            break;
          case 'Favorites':
            iconName = 'heart';
            break;
          case 'Profile':
            iconName = 'person';
            break;
        }

        const onPress = () => {
          navigation.navigate(route.name);
        };

        return (
          <TouchableOpacity
            key={route.key}
            onPress={onPress}
            style={styles.tabButton}
          >
            <Ionicons
              name={iconName}
              size={isFocused ? 28 : 24}
              color={isFocused ? MyTheme.colors.primary : '#888'}
            />
          </TouchableOpacity>
        );
      })}
    </Animated.View>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer theme={MyTheme}>
        <Tab.Navigator
          tabBar={props => <CustomTabBar {...props} />}
          screenOptions={{ headerShown: false }}
        >
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Search" component={SearchScreen} />
          <Tab.Screen name="Favorites" component={FavoritesScreen} />
          <Tab.Screen name="Profile" component={ProfileScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(30, 30, 30, 0.9)',
    borderRadius: 25,
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
  },
  tabButton: {
    padding: 10,
  },
});
