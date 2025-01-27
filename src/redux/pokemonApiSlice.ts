import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://pokeapi.co/api/v2/' }),
    endpoints: (builder) => ({
      getPokemons: builder.query({
        query: (page: number) => `pokemon?offset=${page * 20}&limit=20`,
      }),
      getPokemonDetails: builder.query({
        query: (name: string) => `pokemon/${name}`,
      }),
    }),
  });
  
  export const { useGetPokemonsQuery, useGetPokemonDetailsQuery } = pokemonApi;