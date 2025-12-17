import { Heart, Sparkles } from 'lucide-react';
import { getTypeColor } from '../utils/colors';
import type { CapturedPokemon } from '../types/pokemon';

interface TeamCardProps {
  pokemon: CapturedPokemon;
  onToggleFavorite: () => void;
}

const TeamCard = ({ pokemon }: TeamCardProps) => {
  return (
    <div className={`team-card ${pokemon.isShiny ? 'shiny' : ''}`}>
      {pokemon.isShiny && (
        <div style={{ position: 'absolute', top: 5, left: 5 }}>
          <Sparkles size={20} color="#FFD700" />
        </div>
      )}
      <img 
        src={pokemon.sprite}
        alt={pokemon.name}
        className="team-pokemon-img"
      />
      <div className="team-pokemon-name">{pokemon.name}</div>
      <div className="pokemon-types" style={{ marginTop: 8 }}>
        {pokemon.types.map((type) => (
          <span 
            key={type.type.name}
            className="type-badge"
            style={{ 
              background: getTypeColor(type.type.name),
              fontSize: '0.65rem',
              padding: '3px 8px'
            }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default TeamCard;
