import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

const PokemonCards = ({pokemon}) => {

const [dataPokemon, setDataPokemon] = useState()

const navigate = useNavigate()


    useEffect(() => {
        axios.get(pokemon.url)
        .then(res => setDataPokemon(res.data))
        .catch(err => console.log(err))
    }, [])
    
const handleClickpokemon = () =>{
    navigate(`/pokedex/${dataPokemon?.id }`)
}

const typeData = dataPokemon?.types.map(type => <span key= {type.type.name}> {type.type.name} </span>)


  return (
    <article onClick={handleClickpokemon} className={`PokemonCards pokemoncards__background-${dataPokemon?.types[0].type.name}`}>
        <header className='PokemonCards__header' >
            <h1>{dataPokemon?.name.toUpperCase()}</h1>
            <p> <span className='PokemonCards__span'>Hp.</span>{dataPokemon?.stats.map(stat => {if(stat.stat.name === 'hp'){return <span key={stat.stat.name}>{stat.base_stat}</span>}})}</p>
        </header>

        <div className='PokemonCards__conteiner-img'>
            <div className={`Conteiner__img conteiner__img-backgraund-${dataPokemon?.types[0].type.name}`}>
            <img  src={dataPokemon?.sprites.other["official-artwork"]["front_default"] } /> 
            </div>
            <ul className='PokemonCards__conteiner-lu'>
                <li className='PokemonCards__conteiner-li'> <span className='PokemonCards__span'>N°.</span>{dataPokemon?.id}</li>
                <li className='PokemonCards__conteiner-li'> <span className='PokemonCards__span'>Height.</span>{dataPokemon?.height}</li>
                <li className='PokemonCards__conteiner-li'> <span className='PokemonCards__span'>Weight.</span>{dataPokemon?.weight}</li>
            </ul>
        </div>

        <div className='PokemonCards__data'>
            <p>Type:</p>
            <h3 className='PokemonCards__data-h3'> {typeData} </h3>
            <ul className='PokemonCards__data-ul'>
                <li className='PokemonCards__data-li'>Defense <br/> {dataPokemon?.stats.map(stat => {if(stat.stat.name === 'defense'){return <span key={stat.stat.name}>{stat.base_stat}</span>}})} </li>
                <li className='PokemonCards__data-li'>Attack <br/> {dataPokemon?.stats.map(stat => {if(stat.stat.name === 'attack'){return <span key={stat.stat.name}>{stat.base_stat}</span>}})} </li>
            </ul>

        </div>

    </article>
  )
}
 
export default PokemonCards