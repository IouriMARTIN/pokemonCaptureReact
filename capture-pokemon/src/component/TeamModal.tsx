// src/component/TeamModal.tsx
import type { PokemonData, CapturedPokemon } from '../types/pokemon';

interface TeamModalProps {
  currentPokemon: PokemonData | null;
  capturedPokemon: CapturedPokemon[];
  onRelease: (index: number) => void;
  onClose: () => void;
}

const TeamModal = ({ currentPokemon, capturedPokemon, onRelease, onClose }: TeamModalProps) => {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2 className="modal-title">Équipe Complète !</h2>
        <p style={{ textAlign: 'center', marginBottom: 20 }}>
          Libérez un Pokémon pour capturer <strong>{currentPokemon?.name}</strong>
        </p>
        <div className="modal-team-list">
          {capturedPokemon.map((pokemon, index) => (
            <div key={`modal-${pokemon.id}-${pokemon.capturedAt}`} className="modal-team-item">
              <img 
                src={pokemon.sprite}
                alt={pokemon.name}
                className="modal-pokemon-img"
              />
              <div className="modal-pokemon-info">
                <div className="modal-pokemon-name">
                  {pokemon.name}
                  {pokemon.isShiny && ' ✨'}
                </div>
              </div>
              <button 
                className="release-btn"
                onClick={() => onRelease(index)}
              >
                Libérer
              </button>
            </div>
          ))}
        </div>
        <div style={{ marginTop: 20, textAlign: 'center' }}>
          <button 
            className="btn btn-secondary"
            onClick={onClose}
          >
            Annuler
          </button>
        </div>
      </div>
    </div>
  );
};

export default TeamModal;