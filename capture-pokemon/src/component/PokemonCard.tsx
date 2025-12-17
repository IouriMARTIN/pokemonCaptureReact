import { Sparkles } from 'lucide-react';
import { getTypeColor } from '../utils/colors';
import type { PokemonData } from '../types/pokemon';

interface PokemonCardProps {
  pokemon: PokemonData;
  isShiny: boolean;
}

const PokemonCard = ({ pokemon, isShiny }: PokemonCardProps) => {
  return (
    <div className={`pokemon-card ${isShiny ? 'shiny' : ''}`}>
      {isShiny && (
        <div style={{ position: 'absolute', top: 10, right: 10 }}>
          <Sparkles size={30} color="#FFD700" />
        </div>
      )}
      <img 
        src={pokemon.sprites.other['official-artwork'].front_default}
        alt={pokemon.name}
        className="pokemon-image"
      />
      <div className="pokemon-name">
        {pokemon.name}
        {isShiny && ' ✨'}
      </div>
      <div className="pokemon-types">
        {pokemon.types.map((type) => (
          <span 
            key={type.type.name}
            className="type-badge"
            style={{ background: getTypeColor(type.type.name) }}
          >
            {type.type.name}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PokemonCard;