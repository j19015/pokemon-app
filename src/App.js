import React, { useEffect } from 'react';
import './App.css';
import getAllPokemon from './utils/pokemon.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンのデータを取得
      const res = await getAllPokemon(initialURL);
      // eslint-disable-next-line no-console
      console.log(res);
    };
    fetchPokemonData();
  });
  return <div className="App" />;
}

export default App;
