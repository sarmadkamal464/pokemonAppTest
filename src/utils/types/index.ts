export type pokemon = {
  name: string;
  url: string;
};

export type pokemonContainer = {
  [key: string]: pokemon;
};
