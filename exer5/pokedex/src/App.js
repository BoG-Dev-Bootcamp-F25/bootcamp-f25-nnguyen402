import './App.css';
// import PokemonInfo from './PokemonInfo';
import PokemonDisplay from './components/PokemonDisplay';
import PokemonInfo from './components/PokemonInfo';
import bgImg from './background.jpg';
import React, { useState, useEffect } from 'react';




const URL = "https://pokeapi.co/api/v2/pokemon/";

const getPokemonJSON = async (dexNumber) => {
  try {
    const response = await fetch(`${URL}${dexNumber}/`); 
    const pokemonJSON = await response.json();
    return pokemonJSON;
  } catch(e) {
      throw e;
  }
}

function App() {
  const [pokemon, setPokemon] = useState(null);
  const [dexNumber, setDexNumber] = useState(1);
  const nextHandler = () => {
    setDexNumber(dexNumber + 1);
  };
  const previousHandler = () => {
    if (dexNumber > 1) {
      setDexNumber(dexNumber - 1);
    }
  };

  useEffect(() => {
    getPokemonJSON(dexNumber).then(pokemonData => {
      setPokemon(pokemonData);
    });
  }, [dexNumber]);



  return (
    <>
      <div className = "min-h-screen bg" /*</>style = {{backgroundImage: `url(${bgImg})`}}*/>
        <h1 className = "flex justify-center text-6xl font-bold">
          EXERCISE 5: PokeDex
        </h1>
        <div id = 'container' className = "flex flex-row justify-evenly">
          <div className = "mt-10">
            <PokemonDisplay
              pokemon = {pokemon}
              next = {nextHandler}
              previous = {previousHandler}
            />
          </div>
          <div className="mt-10">
            <PokemonInfo pokemon = {pokemon} />
          </div>
        </div>
      </div>
    </>
  )
}


// export default App;
export default App;




