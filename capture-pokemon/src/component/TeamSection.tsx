// src/component/TeamSection.tsx
import TeamCard from './TeamCard';
import type { CapturedPokemon } from '../types/pokemon';

interface TeamSectionProps {
  capturedPokemon: CapturedPokemon[];
  onToggleFavorite: (index: number) => void;
}

const TeamSection = ({ capturedPokemon, onToggleFavorite }: TeamSectionProps) => {
  return (
    <div className="team-section">
      <h2 className="team-title">Mon Équipe ({capturedPokemon.length}/6)</h2>
      
      {capturedPokemon.length === 0 ? (
        <p style={{ textAlign: 'center', opacity: 0.7 }}>
          0 Pokémons
        </p>
      ) : (
        <div className="team-grid">
          {capturedPokemon.map((pokemon, index) => (
            <TeamCard
              key={`${pokemon.id}-${pokemon.capturedAt}`}
              pokemon={pokemon}
              onToggleFavorite={() => onToggleFavorite(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamSection;