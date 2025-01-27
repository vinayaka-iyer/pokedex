import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPokemonDetailsQuery } from '../redux/pokemonApiSlice';
import { Button } from '@/components/ui/button';

const PokemonDetails: React.FC = () => {
  const navigate = useNavigate()
  const { name } = useParams();
  const { data, isLoading } = useGetPokemonDetailsQuery(name || '');

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="p-4">
      <div className="bg-white rounded-xl shadow p-6 max-w-md mx-auto">
        <div className="text-2xl font-bold capitalize">{data.name}</div>
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="my-4 mx-auto"
        />
        <div>
          <strong>Height:</strong> {data.height}
        </div>
        <div>
          <strong>Weight:</strong> {data.weight}
        </div>
        <div>
          <strong>Abilities:</strong>{' '}
          {data.abilities.map((ability: { ability: { name: string } }) =>
            ability.ability.name
          ).join(', ')}
        </div>
        <Button className='mx-auto my-2' onClick={() => navigate('/')}>Go Back</Button>

      </div>
    </div>
  );
};

export default PokemonDetails;
