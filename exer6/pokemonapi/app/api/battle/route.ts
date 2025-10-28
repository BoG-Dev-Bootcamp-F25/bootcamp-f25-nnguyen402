const pokemonData = async (name: string) => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name.toLowerCase()}`);
    if (!res.ok) {
        throw new Error("Error. Pokemon not found");
    }
    const pokemon_details = await res.json();
    const statsTotal = pokemon_details.stats.reduce((sum: number, stat: any) => {
        return sum + stat.base_stat;
    }, 0);
    return {
        name: pokemon_details.name,
        sprite: pokemon_details.sprites.front_default,
        type: pokemon_details.types.map((typeInfo: any) => typeInfo.type.name),
        statsTotal: statsTotal,
    };
} // helper to get data

export async function POST(req: Request) {
    try{
        const body = await req.json();
        const {pokemon1, pokemon2} = body;
        if (!pokemon1 || !pokemon2) {
            return Response.json(`Error. Pokemon(s) not found`, {status:404});
        }
        const [p1, p2] = await Promise.all([
            pokemonData(pokemon1),
            pokemonData(pokemon2),
        ]);
        let winner;
        if (p1.statsTotal > p2.statsTotal) {
            winner = p1;
        } else if (p2.statsTotal > p1.statsTotal) {
            winner = p2;
        } else {
            winner = 'tie';
        }
        return Response.json(winner, {status:200});
    }
    catch (error){
        return Response.json(`Error, '${error}'`, {status: 500});
    }
}