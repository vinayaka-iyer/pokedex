import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import PokemonList from './pages/PokemonList';
import PokemonDetails from './pages/PokemonDetails';
import { Card } from './components/ui/card';
import { useGetPokemonDetailsQuery } from './redux/pokemonApiSlice';

const App: React.FC = () => {
    const { data } = useGetPokemonDetailsQuery('pikachu');
  return (
    <Router>
      <Card className="bg-card px-4 border-0 justify-between flex gap-6 rounded-2xl w-full">
      
        <div className="font-bold text-lg flex justify-center">
          <div className='flex flex-col justify-center'>  Pokedex</div>
           <img
          src={data?.sprites.front_default}
          alt={data?.name}
          className="mx-auto"
        />
        </div> 
       
      </Card>
      <Routes>
        <Route path="/" element={<PokemonList />} />
        <Route path="/pokemon/:name" element={<PokemonDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
