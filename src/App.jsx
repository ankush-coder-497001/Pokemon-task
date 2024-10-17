import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [pokemon, setPokemon] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=150');
      setPokemon(response.data.results);
    };
    fetchData();
  }, []);

  const filteredPokemon = pokemon.filter(p => 
    p.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="App">
      <h1>Pokémon Search</h1>
      <input 
        type="text" 
        placeholder="Search Pokémon..." 
        value={searchTerm}
        onChange={e => setSearchTerm(e.target.value)}
      />
      <div className="pokemon-cards">
        {filteredPokemon.length!==0 ?filteredPokemon.map((p, index) => (
          <PokemonCard key={index} name={p.name} />
        )) : <h1>No More Pokémons Here !</h1> }
      </div>
    </div>
  );
};

const PokemonCard = ({ name }) => {
  return (
    <div className="pokemon-card">
      <img 
        src={`https://img.pokemondb.net/sprites/home/normal/${name}.png`} 
        alt={name} 
      />
      <h2>{name.charAt(0).toUpperCase() + name.slice(1)}</h2>
    </div>
  );
};

export default App;
