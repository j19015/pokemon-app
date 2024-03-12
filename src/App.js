import React, { useEffect, useState } from 'react';
import './App.css';
import getAllPokemon from './utils/pokemon.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンのデータを取得
      const res = await getAllPokemon(initialURL);
      // eslint-disable-next-line no-console
      console.log(res);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);
  return <div className="App">{loading ? <h1>ロード中</h1> : <h1>データ取得完了</h1>}</div>;
}

export default App;
