export interface PokemonType {
  type: {
    name: string;
  };
}

export interface PokemonData {
  id: number;
  name: string;
  sprites: {
    other: {
      'official-artwork': {
        front_default: string;
      };
    };
  };
  types: PokemonType[];
}

export interface CapturedPokemon {
  id: number;
  name: string;
  sprite: string;
  types: PokemonType[];
  isShiny: boolean;
  isFavorite: boolean;
  capturedAt: number;
}
