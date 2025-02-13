import axios from "axios";
import { useEffect, useState } from "react";
import PokemonCard from "./PokemonCard";

interface Pokemon {
  name: string;
  url: string;
  image: string;
  description: string;
}

const PokemonList = () => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);

  useEffect(() => {
    axios
      .get("https://pokeapi.co/api/v2/pokemon?limit=10")
      .then(async (response) => {
        const result = await Promise.all(
          response.data.results.map(
            async (pokemon: { name: string; url: string }) => {
              const details = await axios.get(pokemon.url);
              return {
                name: pokemon.name,
                image: details.data.sprites.front_default,
                description: details.data.types
                  .map((t: any) => t.type.name)
                  .join(" ,"),
              };
            }
          )
        );
        setPokemonList(result);
      })
      .catch((error) => console.log("Error fetching Pokemon data", error));
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-4">PokeApi</h1>
      <ul className="grid grid-cols-2 gap-4">
        {pokemonList.map((pokemon, index) => (
          <PokemonCard key={index} pokemon={pokemon} />
        ))}
      </ul>
    </div>
  );
};

export default PokemonList;
