// src/navigation/MainNavigator.tsx
import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import DetailsScreen from '../screens/DetailsScreen';
import { pokemonContainer } from '../utils/types';

export type RootStackParamList = {
  Home: undefined;
  Details: pokemonContainer;
};

const Stack = createStackNavigator<RootStackParamList>();

const MainNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen name="Home" component={HomeScreen} />
    <Stack.Screen name="Details" component={DetailsScreen} />
  </Stack.Navigator>
);

export default MainNavigator;
