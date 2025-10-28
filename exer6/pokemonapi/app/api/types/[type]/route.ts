// - returns a list of Pokemon of this type

export const GET = async (req:Request, {params}: {params:{type:string}}) => {
    try {
        const resolvedParams = await(params); 
        const typeName = resolvedParams.type.toLowerCase();
        const res = await fetch(`https://pokeapi.co/api/v2/type/${typeName}`);
        if (!res.ok) {
            return Response.json(`Error. Type '${typeName}' not found`, {status:404});
        }
        const typeData = await res.json();
        const pokemonMapped = typeData.pokemon.map((typeInfo: any) => {
            return typeInfo.pokemon.name;
        });
        return Response.json({
            type: typeName, 
            pokemon: pokemonMapped,
        }, {status:200});

    } catch(error) {
        return Response.json(`Error, '${error}'`, {status: 500});
    }
    

}