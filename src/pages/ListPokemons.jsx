import React from 'react'
import PokemonCards from '../components/PokemonCards'

const ListPokemons = ({pokemonFilter}) => {
  return (
    <ul className='ListPokemons' >
        {
        pokemonFilter.map((pokemon) => <PokemonCards key={pokemon.url} pokemon={pokemon} /> )
        }
    </ul>
  )
}

export default ListPokemons