import '../App.css';
import React from 'react';
import PokemonType from './PokemonType';
// import  {FaArrowLeft, FaArrowRight } from "react-icons/fa";





function PokemonDisplay ({ pokemon , next, previous }) {
    if (!pokemon) {
        return <div>Loading...</div>
    }
    return (
        <div id = "container" className="flex flex-col items-center">
            <div id = "sprite" className = "w-96 h-96 border-4 border-black bg-gray-200 rounded-xl">
                <img 
                    className= "w-full h-full object-contain" 
                    src = {pokemon.sprites.front_default} 
                    alt = "pokemon"
                />
            </div>
            <div id = "name">
                <p className = "capitalize border-2 border-black bg-gray-200 w-fit rounded-xl px-40 py-1 text-xl mt-2 mb-2">{pokemon.name}</p>
            </div>
            <div id = "type" className = "flex flex-col">
                <p className = "font-bold bg-gray-500 px-16 w-fit rounded-xl">Types</p>
                <div className = "flex flex-row gap-1">
                    {pokemon.types.map(typeMap => (
                        <PokemonType key = {typeMap.slot} typeName = {typeMap.type.name} />
                    ))}
                </div>
            </div>
            <div id = "arrows">
                <button onClick ={previous} className={`button-style`}>{"<"}</button>
                <button onClick = {next} className={`button-style`}>{">"}</button>
            </div>
        </div>

    )
}
export default PokemonDisplay;