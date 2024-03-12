import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);

  useEffect(() => {
    const loadPokemon = async (data) => {
      const pokemonDataPromiseArray = await Promise.all(
        data.map((pokemon) => {
          const pokemonRecord = getPokemon(pokemon.url);
          return pokemonRecord;
        }),
      );
      setPokemonData(pokemonDataPromiseArray);
    };

    const fetchPokemonData = async () => {
      // 全てのポケモンのデータを取得
      const res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  console.log(pokemonData);

  return <div className="App">{loading ? <h1>ロード中</h1> : <h1>データ取得完了</h1>}</div>;
}

export default App;
