interface Pokemon {
  name: string;
  image: string;
  description: string;
}

const PokemonCard = ({ pokemon }: { pokemon: Pokemon }) => {
  return (
    <div className="p-4 bg-white shadow-md rounded-lg hover:bg-gray-200">
      <img
        src={pokemon.image}
        alt={pokemon.name}
        className="w-20 h-20 mx-auto"
      />
      <h2 className="text-lg font-bold text-center mt-2">
        {pokemon.name.toUpperCase()}
      </h2>
      <p className="text-sm text-gray-600 text-center mt-1">
        {pokemon.description}
      </p>
    </div>
  );
};

export default PokemonCard;
