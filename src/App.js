import React, { useEffect, useState } from 'react';
import './App.css';
import { getAllPokemon, getPokemon } from './utils/pokemon.js';
import Card from './components/Card/Card.js';
import Navbar from './components/Navbar/Navbar.js';

function App() {
  const initialURL = 'https://pokeapi.co/api/v2/pokemon';
  const [loading, setLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState('');
  const [prevUrl, setPrevUrl] = useState('');

  const loadPokemon = async (data) => {
    const pokemonDataPromiseArray = await Promise.all(
      data.map((pokemon) => {
        const pokemonRecord = getPokemon(pokemon.url);
        return pokemonRecord;
      }),
    );
    setPokemonData(pokemonDataPromiseArray);
  };

  useEffect(() => {
    const fetchPokemonData = async () => {
      // 全てのポケモンのデータを取得
      const res = await getAllPokemon(initialURL);
      // 各ポケモンの詳細なデータを取得
      loadPokemon(res.results);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      setLoading(false);
    };
    fetchPokemonData();
  }, []);

  const handlePrevPage = async () => {
    if (!prevUrl) return;
    setLoading(true);
    const res = await getAllPokemon(prevUrl);
    await loadPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false);
  };
  const handleNextPage = async () => {
    if (!nextUrl) return;
    setLoading(true);
    const res = await getAllPokemon(nextUrl);
    await loadPokemon(res.results);
    setNextUrl(res.next);
    setPrevUrl(res.previous);
    setLoading(false);
  };

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>ロード中</h1>
        ) : (
          <>
            <div className="pokemonCardContainer">
              {pokemonData.map((pokemon) => (
                <Card key={pokemon.id} pokemon={pokemon} />
              ))}
            </div>
            <div className="btn">
              <button type="button" onClick={handlePrevPage}>
                前へ
              </button>
              <button type="button" onClick={handleNextPage}>
                次へ
              </button>
            </div>
          </>
        )}
      </div>
    </>
  );
}

export default App;
