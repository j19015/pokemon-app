import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

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

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <div className="pokemonCardContainer">
            {pokemonData.map((pokemon) => (
              <Card key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default App;
