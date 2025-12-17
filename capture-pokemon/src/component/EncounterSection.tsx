// src/component/EncounterSection.tsx
import { Loader } from 'lucide-react';
import PokemonCard from './PokemonCard';
import Pokeball from './Pokeball';
import type { PokemonData } from '../types/pokemon';

interface EncounterSectionProps {
  loading: boolean;
  currentPokemon: PokemonData | null;
  isShiny: boolean;
  message: string;
  attempts: number;
  capturing: boolean;
  onThrowPokeball: () => void;
  onFlee: () => void;
  onNewEncounter: () => void;
}

const EncounterSection = ({
  loading,
  currentPokemon,
  isShiny,
  message,
  attempts,
  capturing,
  onThrowPokeball,
  onFlee,
  onNewEncounter
}: EncounterSectionProps) => {
  return (
    <div className="encounter-section">
      <h2 className="team-title">Rencontre Sauvage</h2>
      
      {loading ? (
        <div className="loader">
          <Loader className="spinning" size={40} />
        </div>
      ) : currentPokemon ? (
        <>
          <PokemonCard pokemon={currentPokemon} isShiny={isShiny} />

          <div className="message-box">
            {message || 'Lancez une Pokéball !'}
          </div>

          <div className="attempts">
            {[...Array(3)].map((_, i) => (
              <Pokeball 
                key={i}
                used={i < attempts}
                throwing={capturing && i === attempts}
              />
            ))}
          </div>

          <div className="actions">
            <button 
              className="btn btn-primary"
              onClick={onThrowPokeball}
              disabled={attempts >= 3 || capturing}
            >
              🎯 Lancer Pokéball
            </button>
            <button 
              className="btn btn-secondary"
              onClick={onFlee}
              disabled={capturing}
            >
              💨 Fuir
            </button>
          </div>
        </>
      ) : (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <button 
            className="btn btn-success"
            onClick={onNewEncounter}
          >
            🔍 Nouvelle Rencontre
          </button>
        </div>
      )}
    </div>
  );
};

export default EncounterSection;