import React from 'react';
import { useGetPokemonsQuery } from '../redux/pokemonApiSlice';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const PokemonList: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const { data, isLoading } = useGetPokemonsQuery(page);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.results.map((pokemon: { name: string }) => (
          <Link
            to={`/pokemon/${pokemon.name}`}
            key={pokemon.name}
            className="bg-white rounded-xl shadow p-4 hover:shadow-lg"
          >
            <div className="capitalize text-lg font-medium">{pokemon.name}</div>
          </Link>
        ))}
      </div>
      <div className="flex justify-center mt-4">
        <Button onClick={() => setPage((prev) => Math.max(prev - 1, 0))}>
          Previous
        </Button>
        <Button className="ml-2" onClick={() => setPage((prev) => prev + 1)}>
          Next
        </Button>
      </div>
    </div>
  );
};

export default PokemonList;
