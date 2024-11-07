import React from 'react';
import { FlatList, Text, TouchableOpacity } from 'react-native';
import { useInfiniteQuery } from 'react-query';
import { fetchPokemon } from '../../api/pokemon';
import { useNavigation } from '@react-navigation/native';
import { HomeScreenNavigationProp } from '../../navigation/types';
import { styles } from './styles';
import { RECORDS_PER_PAGE, STATUS } from '../../utils/constants';
import { pokemon } from '../../utils/types';
import { Loader } from '../../components/Loader';
import { ListRenderItemInfo } from 'react-native';

const HomeScreen = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  // Fetch paginated Pokémon data using useInfiniteQuery
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    error,
  } = useInfiniteQuery<pokemon[], Error>(
    'pokemon',
    ({ pageParam = 0 }) => fetchPokemon(pageParam, RECORDS_PER_PAGE),
    {
      getNextPageParam: (lastPage, allPages) =>
        lastPage.length ? allPages.length : undefined,
    },
  );

  if (status === STATUS.loading) {
    return <Loader size="large" />;
  }

  if (status === STATUS.error) {
    return <Text>Error loading data: {(error as Error)?.message}</Text>;
  }

  // Render each Pokémon item in the list
  const renderPokemonItem = ({ item }: ListRenderItemInfo<pokemon>) => {
    const name: string =
      item?.name?.charAt(0).toUpperCase() + item?.name.slice(1) || 'Unknown';

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() => navigation.navigate('Details', { pokemon: item })}>
        <Text style={styles.nameText}>{name}</Text>
      </TouchableOpacity>
    );
  };

  return (
    <FlatList
      data={data?.pages.flat() || []}
      keyExtractor={item => item.url || Math.random().toString(36)}
      renderItem={renderPokemonItem}
      onEndReached={() => hasNextPage && fetchNextPage()}
      ListFooterComponent={
        isFetchingNextPage ? <Loader size={'small'} /> : null
      }
    />
  );
};

export default HomeScreen;
