// You can retrieve the pokemons by calling the following API
// Make sure to replace limit and offset with the appropriate values
// https://pokeapi.co/api/v2/pokemon?limit=5&offset=0

import { useEffect } from "react";
import { useState } from "react";


const baseUrl = "https://pokeapi.co/api/v2/pokemon?limit=5&offset=0"
const PokemonList = () => {
    const [pokemonInfo, setPokemonInfo] = useState({})
    const [pokemonShowed, setPokemonShowed] = useState([])

    useEffect(() => {
        getPokemonInfo()
    },[])

    const getPokemonInfo = async (url = baseUrl) => {
        const response = await fetch(url)
        const pokeInfo = await response.json()
        setPokemonInfo(pokeInfo)
        setPokemonShowed([...pokemonShowed, ...pokeInfo.results])
    }

    const loadMorePokemon = async () => {
        getPokemonInfo(pokemonInfo.next)
    }
    return (
        <>
        <ul>
        {pokemonShowed && pokemonShowed.map((pokemon, index) => (
            <li key={index}>
                {pokemon.name}
            </li>
        ))}
        </ul>
        {pokemonInfo && <div>{`Displaying ${pokemonShowed.length} of ${pokemonInfo.count} results`}</div>}
        {pokemonShowed.length !== pokemonInfo.count && <button onClick={loadMorePokemon}>Load more</button>}
    </>
    )

};

export default PokemonList;
