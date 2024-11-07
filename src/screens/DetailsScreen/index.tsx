import React, { useEffect } from 'react';
import { View, Text, Alert } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { RouteProp } from '@react-navigation/native';
import { styles } from './styles';
import { pokemonContainer } from '../../utils/types';

type DetailsScreenRouteProp = RouteProp<
  { Details: pokemonContainer },
  'Details'
>;

const DetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<DetailsScreenRouteProp>();

  useEffect(() => {
    // Set up the event listener for the native back button
    const unsubscribe = navigation.addListener('beforeRemove', e => {
      // Prevent default behavior of back action
      e.preventDefault();
      navigation.dispatch(e.data.action);
    });

    // Clean up the listener when the component unmounts
    return unsubscribe;
  }, [navigation]);

  if (!route.params || !route.params.pokemon) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>Error: No Pokémon data available.</Text>
      </View>
    );
  }

  const { pokemon } = route.params;

  const capitalizeWord = (word: string) =>
    word.charAt(0).toUpperCase() + word.slice(1);

  return (
    <View style={styles.container}>
      <Text style={styles.nameText}>{capitalizeWord(pokemon.name)}</Text>
      <Text style={styles.linkText}>Learn more about {pokemon.name}</Text>
    </View>
  );
};

export default DetailsScreen;
