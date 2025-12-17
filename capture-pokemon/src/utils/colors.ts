// src/utils/colors.ts
export const TYPE_COLORS: Record<string, string> = {
  normal: 'var(--pokecatch-color-normal)',
  fire: 'var(--pokecatch-color-fire)',
  water: 'var(--pokecatch-color-water)',
  electric: 'var(--pokecatch-color-electric)',
  grass: 'var(--pokecatch-color-grass)',
  ice: 'var(--pokecatch-color-ice)',
  fighting: 'var(--pokecatch-color-fighting)',
  poison: 'var(--pokecatch-color-poison)',
  ground: 'var(--pokecatch-color-ground)',
  flying: 'var(--pokecatch-color-flying)',
  psychic: 'var(--pokecatch-color-psychic)',
  bug: 'var(--pokecatch-color-bug)',
  rock: 'var(--pokecatch-color-rock)',
  ghost: 'var(--pokecatch-color-ghost)',
  dragon: 'var(--pokecatch-color-dragon)',
  dark: 'var(--pokecatch-color-dark)',
  steel: 'var(--pokecatch-color-steel)',
  fairy: 'var(--pokecatch-color-fairy)'
};

export const getTypeColor = (typeName: string): string => {
  return TYPE_COLORS[typeName] || '#777';
};