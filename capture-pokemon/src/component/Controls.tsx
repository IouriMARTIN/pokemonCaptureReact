import { Moon, Sun } from 'lucide-react';

interface ControlsProps {
  teamCount: number;
  darkMode: boolean;
  onToggleDarkMode: () => void;
}

const Controls = ({ teamCount, darkMode, onToggleDarkMode }: ControlsProps) => {
  return (
    <div className="controls">
      <div className="team-count">
        Équipe: {teamCount}/6
      </div>
      <button 
        className="icon-btn" 
        onClick={onToggleDarkMode}
        title={darkMode ? "Mode clair" : "Mode sombre"}
      >
        {darkMode ? <Sun size={20} /> : <Moon size={20} />}
      </button>
    </div>
  );
};

export default Controls;