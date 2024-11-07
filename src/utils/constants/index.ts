export const POKEMON_API_URL = (limit: number, offset: number): string => {
  return `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`;
};

export const STATUS = {
  error: 'error',
  loading: 'loading',
} as const;

export const LOADER_COLOR: string = '#0000ff';

export const RECORDS_PER_PAGE: number = 10;
