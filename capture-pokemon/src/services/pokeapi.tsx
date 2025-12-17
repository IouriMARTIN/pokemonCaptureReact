import type { PokemonData } from '../types/pokemon';

const POKEAPI_BASE_URL = 'https://pokeapi.co/api/v2';
const GEN1_POKEMON_COUNT = 151;
const SHINY_RATE = 1 / 512;

export const encounterRandomPokemon = async (): Promise<{ pokemon: PokemonData; isShiny: boolean }> => {
  const randomId = Math.floor(Math.random() * GEN1_POKEMON_COUNT) + 1;
  const isShiny = Math.random() < SHINY_RATE;
  
  const response = await fetch(`${POKEAPI_BASE_URL}/pokemon/${randomId}`);
  
  if (!response.ok) {
    throw new Error('Failed to fetch Pokemon');
  }
  
  const pokemon: PokemonData = await response.json();
  
  return { pokemon, isShiny };
};