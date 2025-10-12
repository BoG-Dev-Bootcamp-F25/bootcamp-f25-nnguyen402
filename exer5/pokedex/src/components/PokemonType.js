import '../App.css';
import React from 'react';




//https://pokeapi.co/api/v2/type/{id or name}/

const type = ({ typeName }) => {
    return (<span className = {`Type-BG type-${typeName}`}>{typeName}</span>);
}

export default type;