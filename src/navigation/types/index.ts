// src/navigation/types.ts
import { RouteProp } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { pokemonContainer } from '../../utils/types';

export type RootStackParamList = {
  Home: undefined;
  Details: pokemonContainer;
};

// Navigation prop type for HomeScreen
export type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'Home'
>;

// Route prop type for DetailsScreen
export type DetailsScreenRouteProp = RouteProp<RootStackParamList, 'Details'>;
