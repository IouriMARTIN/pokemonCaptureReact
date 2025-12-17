// src/utils/storage.ts
import type { CapturedPokemon } from '../types/pokemon';

const STORAGE_KEYS = {
  TEAM: 'pokecatch-team',
  DARK_MODE: 'pokecatch-darkmode'
};

export const loadTeam = (): CapturedPokemon[] => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.TEAM);
    return saved ? JSON.parse(saved) : [];
  } catch (error) {
    console.error('Error loading team:', error);
    return [];
  }
};

export const saveTeam = (team: CapturedPokemon[]): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.TEAM, JSON.stringify(team));
  } catch (error) {
    console.error('Error saving team:', error);
  }
};

export const loadDarkMode = (): boolean => {
  try {
    const saved = localStorage.getItem(STORAGE_KEYS.DARK_MODE);
    return saved === 'true';
  } catch (error) {
    console.error('Error loading dark mode:', error);
    return false;
  }
};

export const saveDarkMode = (isDark: boolean): void => {
  try {
    localStorage.setItem(STORAGE_KEYS.DARK_MODE, isDark.toString());
  } catch (error) {
    console.error('Error saving dark mode:', error);
  }
};