import { useState, useEffect } from 'react';
import Header from './component/Header';
import Controls from './component/Controls';
import EncounterSection from './component/EncounterSection';
import TeamSection from './component/TeamSection';
import TeamModal from './component/TeamModal';
import { encounterRandomPokemon } from './services/pokeapi';
import { loadTeam, saveTeam, loadDarkMode, saveDarkMode } from './utils/storage';
import type { PokemonData, CapturedPokemon } from './types/pokemon';
import './styles/App.css';

const App = () => {
  const [currentPokemon, setCurrentPokemon] = useState<PokemonData | null>(null);
  const [capturedPokemon, setCapturedPokemon] = useState<CapturedPokemon[]>([]);
  const [attempts, setAttempts] = useState<number>(0);
  const [isShiny, setIsShiny] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>('');
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [showTeamModal, setShowTeamModal] = useState<boolean>(false);
  const [capturing, setCapturing] = useState<boolean>(false);

  useEffect(() => {
    setCapturedPokemon(loadTeam());
    setDarkMode(loadDarkMode());
  }, []);

  useEffect(() => {
    if (capturedPokemon.length > 0) {
      saveTeam(capturedPokemon);
    }
  }, [capturedPokemon]);

  useEffect(() => {
    saveDarkMode(darkMode);
    document.body.style.backgroundColor = darkMode ? '#1a1a2e' : '#f0f8ff';
  }, [darkMode]);

  const encounterPokemon = async () => {
    setLoading(true);
    setMessage('');
    setAttempts(0);
    setCapturing(false);
    
    try {
      const { pokemon, isShiny: shiny } = await encounterRandomPokemon();
      setCurrentPokemon(pokemon);
      setIsShiny(shiny);
      setMessage(shiny ? '✨ Un Pokémon Shiny sauvage apparaît ! ✨' : 'Un Pokémon sauvage apparaît !');
    } catch (error) {
      setMessage('Erreur lors de la rencontre...');
    } finally {
      setLoading(false);
    }
  };

  const throwPokeball = () => {
    if (attempts >= 3 || !currentPokemon) return;
    
    setCapturing(true);
    const newAttempts = attempts + 1;
    setAttempts(newAttempts);
    
    setTimeout(() => {
      const catchRate = 0.10 + Math.random() * 0.05;
      const success = Math.random() < catchRate;
      
      if (success) {
        if (capturedPokemon.length >= 6) {
          setShowTeamModal(true);
          setMessage('Votre équipe est complète ! Libérez un Pokémon pour capturer celui-ci.');
        } else {
          const newPokemon: CapturedPokemon = {
            id: currentPokemon.id,
            name: currentPokemon.name,
            sprite: currentPokemon.sprites.other['official-artwork'].front_default,
            types: currentPokemon.types,
            isShiny,
            isFavorite: false,
            capturedAt: Date.now()
          };
          setCapturedPokemon([...capturedPokemon, newPokemon]);
          setMessage(` ${currentPokemon.name.toUpperCase()} capturé !`);
          setCurrentPokemon(null);
        }
      } else if (newAttempts >= 3) {
        setMessage(`${currentPokemon.name.toUpperCase()} s'est enfui...`);
        setTimeout(() => encounterPokemon(), 2000);
      } else {
        setMessage(`Raté ! ${3 - newAttempts} essai(s) restant(s)`);
      }
      setCapturing(false);
    }, 1000);
  };

  const releasePokemon = (index: number) => {
    const updated = capturedPokemon.filter((_, i) => i !== index);
    setCapturedPokemon(updated);
    saveTeam(updated);
  };

  useEffect(() => {
    encounterPokemon();
  }, []);

  return (
    <div className={`app ${darkMode ? 'dark' : ''}`}>
      <div className="container">
        <Header />
        
        <Controls 
          teamCount={capturedPokemon.length}
          darkMode={darkMode}
          onToggleDarkMode={() => setDarkMode(!darkMode)}
        />

        <div className="main-content">
          <EncounterSection
            loading={loading}
            currentPokemon={currentPokemon}
            isShiny={isShiny}
            message={message}
            attempts={attempts}
            capturing={capturing}
            onThrowPokeball={throwPokeball}
            onNewEncounter={encounterPokemon}
          />

          <TeamSection
            capturedPokemon={capturedPokemon}
          />
        </div>
      </div>

      {showTeamModal && (
        <TeamModal
          currentPokemon={currentPokemon}
          capturedPokemon={capturedPokemon}
          onRelease={(index: number) => {
            releasePokemon(index);
            setShowTeamModal(false);
            throwPokeball();
          }}
          onClose={() => setShowTeamModal(false)}
        />
      )}
    </div>
  );
};

export default App;