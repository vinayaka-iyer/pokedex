# Project Documentation: Pokedex using Redux and RTKQuery

## Redux and RTK Query Code Breakdown

#### 1. **What is Redux and RTK Query?**
- **Redux**: A state management library to manage the state of your app globally.
- **RTK Query**: A tool provided by Redux Toolkit for data fetching and caching. It simplifies making API calls and managing server-side state.

In our app, we use **RTK Query** to fetch the Pokémon data from the PokeAPI.

---

#### 2. **RTK Query Setup (`pokemonApi.ts`)**
This file defines an API slice where we configure how to fetch data from the PokeAPI.

##### Code:
```typescript
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
```

---

### Step-by-Step Breakdown:

1. **`createApi`**:
   - The `createApi` function defines the structure of the API.
   - It takes a `reducerPath`, `baseQuery`, and an `endpoints` function.

2. **`reducerPath`**:
   - A unique key to identify the slice in the Redux store. Here, it’s `pokemonApi`.

3. **`baseQuery`**:
   - Defines the base URL for all API calls: `https://pokeapi.co/api/v2/`.

4. **`endpoints`**:
   - This is where you define the API endpoints (different API operations).
   - Each endpoint is defined using a builder function:
     - `builder.query`: For GET requests.
     - `builder.mutation`: For POST/PUT/DELETE requests.

5. **`getPokemons`**:
   - Fetches a paginated list of Pokémon.
   - Accepts a `page` parameter to calculate the `offset`.
   - Example API call: `https://pokeapi.co/api/v2/pokemon?offset=20&limit=20`.

6. **`getPokemonDetails`**:
   - Fetches details of a specific Pokémon by its name.
   - Example API call: `https://pokeapi.co/api/v2/pokemon/pikachu`.

7. **`useGetPokemonsQuery` and `useGetPokemonDetailsQuery`**:
   - These are auto-generated React hooks for the defined endpoints.
   - They are used in components to fetch and cache data.

---

#### 3. **Store Setup (`store.ts`)**
The store integrates the `pokemonApi` slice into the Redux state.

##### Code:
```typescript
import { configureStore } from '@reduxjs/toolkit';
import { pokemonApi } from '../features/pokemonApi';

export const store = configureStore({
  reducer: {
    [pokemonApi.reducerPath]: pokemonApi.reducer, // Add the RTK Query reducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(pokemonApi.middleware), // Add the RTK Query middleware
});

export type RootState = ReturnType<typeof store.getState>; // Defines the state type
export type AppDispatch = typeof store.dispatch; // Defines the dispatch type
```

---

### Step-by-Step Breakdown:

1. **`configureStore`**:
   - This function initializes the Redux store.

2. **`reducer`**:
   - The reducers define how state changes.
   - RTK Query automatically provides a reducer for `pokemonApi` to manage its cache.

3. **`middleware`**:
   - RTK Query requires middleware for caching, invalidation, and request lifecycle management.
   - This middleware is added using `concat(pokemonApi.middleware)`.

4. **`RootState` and `AppDispatch`**:
   - These are TypeScript helpers:
     - `RootState`: Type for the global Redux state.
     - `AppDispatch`: Type for the `dispatch` function.

---

#### 4. **Fetching Data with RTK Query Hooks**
RTK Query auto-generates hooks (`useGetPokemonsQuery` and `useGetPokemonDetailsQuery`) for fetching data.

##### Example in `PokemonList.tsx`:
```typescript
const { data, isLoading } = useGetPokemonsQuery(page);
```

1. **`useGetPokemonsQuery`**:
   - This hook makes the API call to fetch a paginated list of Pokémon.
   - Returns:
     - `data`: The fetched data.
     - `isLoading`: A boolean indicating if the request is still loading.

2. **Using the `data`**:
   - Once the data is loaded, it’s displayed as cards.
   ```typescript
   data.results.map((pokemon) => (
     <Link to={`/pokemon/${pokemon.name}`} key={pokemon.name}>
       {pokemon.name}
     </Link>
   ));
   ```

##### Example in `PokemonDetails.tsx`:
```typescript
const { data, isLoading } = useGetPokemonDetailsQuery(name || '');
```

1. **`useGetPokemonDetailsQuery`**:
   - Fetches details of a Pokémon by its name.
   - Returns:
     - `data`: Detailed data about the Pokémon.
     - `isLoading`: Loading state for the request.

2. **Displaying the Data**:
   ```typescript
   <div>
     <strong>Height:</strong> {data.height}
   </div>
   ```

---

### 5. **State Management Summary**
- **Redux**: Stores the global state.
- **RTK Query**: Manages the API state (loading, caching, error handling).
- **Components**:
  - `PokemonList`: Fetches and displays paginated Pokémon data.
  - `PokemonDetails`: Fetches and displays detailed data for a specific Pokémon.

---