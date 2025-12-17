interface PokeballProps {
  used: boolean;
  throwing: boolean;
}

const Pokeball = ({ used, throwing }: PokeballProps) => {
  return (
    <div className={`pokeball ${used ? 'used' : ''} ${throwing ? 'throwing' : ''}`}>
      <div className="pokeball-button"></div>
    </div>
  );
};

export default Pokeball;