//- returns the next evolution step for a specified Pokemon. If the Pokemon is fully evolved, 
// return the current evolution stage


export const GET = async (req:Request, {params}: {params:{name:string}}) => {
    try {
        const resolvedParams = await(params); // need this or it will say not found
        const pokemonName = resolvedParams.name.toLowerCase();
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!pokemon.ok) {
            return Response.json("Error. Pokemon not found", {status:404});
        }
        const pokemonDetails = await pokemon.json();

        const species = await fetch(`https://pokeapi.co/api/v2/pokemon-species/${pokemonName}`);

        if (!species.ok) {
            return Response.json("Error. Species not found", {status:404});
        }
        const speciesDetails = await species.json();
        const evo = await fetch(speciesDetails.evolution_chain.url);

        if (!evo.ok) {
            return Response.json("Error. Evolution chain not found", {status:404});
        }
        const evoDetails = await evo.json();

        const chain = evoDetails.chain;
        let evoName = pokemonName;

        if (chain.species.name === pokemonName) {
            if (chain.evolves_to.length > 0) {
                evoName = chain.evolves_to[0].species.name;
            }
        }
        else if (chain.evolves_to.length > 0) {
            const stage2 = chain.evolves_to[0];
            if (stage2.species.name === pokemonName) {
                evoName = stage2.evolves_to[0].species.name;
            }
        }
        const detailsFormatted = {
            name: pokemonDetails.name,
            evolution: evoName,
            sprite: pokemonDetails.sprites.front_default,
            type: pokemonDetails.types.map((typeInfo: any) => typeInfo.type.name),
        };
        return Response.json(detailsFormatted, {status:200});



    } catch(error) {
        return Response.json(`Error, '${error}'`, {status: 500});
    }
    

}
