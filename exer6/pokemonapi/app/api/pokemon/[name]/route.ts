// returns the name, sprite, and type of a certain Pokemon

export const GET = async (req:Request, {params}: {params:{name:string}}) => {
    try {
        // console.log(params);
        const resolvedParams = await(params); // need this or it will say not found
        const pokemonName = resolvedParams.name.toLowerCase();
        // return Response.json(`${pokemonName}`);
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!res.ok) {
            return Response.json("Error. Pokemon not found", {status:404});
        }
        const pokemon_details = await res.json();
        const details_formatted = {
            name: pokemon_details.name,
            sprite: pokemon_details.sprites.front_default,
            type: pokemon_details.types.map((typeInfo: any) => typeInfo.type.name),
        };
        return Response.json(details_formatted, {status:200});

    } catch(error) {
        return Response.json(`Error, '${error}'`, {status: 500});
    }
    

}