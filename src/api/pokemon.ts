import axios from 'axios';
import { pokemon } from '../utils/types';
import { POKEMON_API_URL } from '../utils/constants';

/**
 * Fetches a paginated list of Pokémon from the Pokémon API.
 *
 * @param {number} page - The current page number for pagination.
 * @param {number} recordPerPage - The number of records to fetch per page.
 * @returns {Promise<pokemon[]>} A promise that resolves to an array of Pokémon objects.
 *
 * @example
 * const pokemonList = await fetchPokemon(1, 10);
 * console.log(pokemonList);
 *
 * @throws {Error} Logs an error to the console if the request fails and returns an empty array.
 */
export const fetchPokemon = async (
  page: number,
  recordPerPage: number,
): Promise<pokemon[]> => {
  const offset = page * recordPerPage;
  const url = POKEMON_API_URL(recordPerPage, offset);

  try {
    const response = await axios.get(url);
    return response.data.results as pokemon[];
  } catch (error) {
    console.error('Error fetching Pokémon data:', error);
    return [];
  }
};
