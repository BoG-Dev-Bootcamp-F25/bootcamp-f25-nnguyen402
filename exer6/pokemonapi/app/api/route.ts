// - returns the name, sprite, and type of random Pokemon


export const GET = async (req:Request): Promise<Response> => {
    try {
        const random_id = Math.floor(Math.random() * 1025) + 1; // all standard pokemon
        const pokemon = await fetch(`https://pokeapi.co/api/v2/pokemon/${random_id}`);
        
        if (!pokemon.ok) {
            return Response.json("Error. Pokemon not found", {status:404});
        }

        const pokemon_details = await pokemon.json();
        const details_formatted = {
            name: pokemon_details.name,
            sprite: pokemon_details.sprites.front_default,
            type: pokemon_details.types.map((typeInfo: any) => typeInfo.type.name),
        };
        return Response.json(details_formatted, {status:200});

    } catch(error) {
        return Response.json("Error", {status: 500});
    }
    

}