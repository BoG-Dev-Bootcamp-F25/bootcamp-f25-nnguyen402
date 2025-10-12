import '../App.css';
import React, { useState } from 'react';



// .moves and .stats

function PokemonInfo ({ pokemon }) {
    const [tab, setTab] = useState('Info');


    if (!pokemon) {
        return <div>Loading...</div>
    }

    const slctdBtn = "rounded-xl bg-green-500 p-1 text-4xl px-8 m-1 mt-5";
    const unslctdBtn = "rounded-xl bg-gray-300 p-1 text-4xl px-8 m-1 mt-5";
    return (
        <div>
            <div id='container' className = "flex flex-col items-center">
                {tab === 'Info' && (
                    <div>
                        <div id = "title" className="bg-gray-200 rounded-xl text-center text-4xl font-bold mb-4">
                            <p>Info</p>
                        </div>
                        <div id = "info-panel" className = {`panel-style`}>
                            <ul>
                                <li>
                                    <span className = "text-2xl">Height: {pokemon.height}m</span>
                                </li>
                                <li>
                                    <span className = "text-2xl">Weight: {pokemon.weight}kg</span>
                                </li>
                                <li>

                                </li>
                                {pokemon.stats.map(statsInfo => (
                                    <li>
                                        <span className = "capitalize text-2xl">{statsInfo.stat.name}: {statsInfo.base_stat}</span>
                                    </li>   
                                ))}
                            </ul>

                        </div>
                    </div>
                )}


                {tab === 'Moves' && (
                    <div>
                        <div id = "title" className="bg-gray-200 rounded-xl text-center text-4xl font-bold mb-4">
                            <p>Moves</p>
                        </div>
                        <div id = "moves-panel" className = {`panel-style`}>
                            <ul className="grid grid-cols-3 ">
                                {pokemon.moves.map(movesInfo => (
                                    <li className="capitalize">{movesInfo.move.name}</li>
                                ))}
                            </ul>

                        </div>
                    </div>
                )}

                <div id="buttons"> 
                    <button onClick={() => setTab('Info')} className={`${tab === 'Info' ? slctdBtn : unslctdBtn}`}>Info</button>
                    <button onClick={() => setTab('Moves')} className={`${tab === 'Moves' ? slctdBtn : unslctdBtn}`}>Moves</button>
                </div>
            </div>
 
        </div>

    )
}
export default PokemonInfo;