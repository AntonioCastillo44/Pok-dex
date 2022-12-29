import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import titlePokedex from '../img/7fdbe70629fd37b7fb04457e42c41f1d.png'

const Pokemon = () => {

  const [dataPokemon, setDataPokemon] = useState()
  const { id } = useParams()

  const navigate = useNavigate()

  const percentageStat = (valueStat) => {
    const maxValue = 150
    return `${(valueStat * 100) / maxValue}%`
  }

  const handleClickpokemon = () =>{
    navigate('/pokedex/')
}

  useEffect(() => {
    axios.get(`https://pokeapi.co/api/v2/pokemon/${id}/`)
      .then(res => setDataPokemon(res.data))
      .catch(err => console.log(err))
  }, [])

  const typeData = dataPokemon?.types.map(type => <span key= {type.type.name}> {type.type.name} </span>)
  console.log(dataPokemon)

  return (
    <main className='Pokemon__main'>

      <header className='Pokedex__header'>
        <div className='Pokedex__header-black'></div>
        <img className='titlePokedex' src={titlePokedex} onClick={handleClickpokemon}/>
        <div className='Pokedex__header-circle'>
          <div className='Pokedex__header-cicle-int'> </div>
        </div>
      </header>

    <section className='Pokemon'> 

      <article className='Pokemon__statistics'>
        <div className='Pokemon__statistics-img'> <img src={dataPokemon?.sprites.other["official-artwork"]["front_default"] } alt="" /> </div>

        <div className='Pokemon__statistics-data'>
          <h2 className='Pokemon__statistics-data-h2'> Statistics - {dataPokemon?.name} </h2>
          <article>
            {
              dataPokemon?.stats.map  (stat =>(
              <div key={stat.stat.name}> 
                <h1 className='Pokemon__statistics-data-h1' >{stat.stat.name}</h1> 
                  <div className='Pokemon__statistics-data-div'> 
                    <div style={{width: percentageStat(stat.base_stat)}} className={`Pokemon__statistics-data-percentage pokemoncards__background-${dataPokemon?.types[0].type.name}`} ></div> 
                       <p> {stat.base_stat}/150  </p> 
                    </div>
                  </div>  ))
            }
          </article>

          <div className='Pokemon__statistics-div'>
          <p className='Pokemon__statistics-data-p'> Type </p>
          <h3 className='Pokemon__statistics-data-h3'> {typeData} </h3>
          </div>
       
        </div>
      </article>

      <article className='Pokemon__data'>
        <h1 className='Pokemon__data-h1'> {dataPokemon?.name} </h1> 
        <div className={`Pokemon__data-div  pokemoncards__background-${dataPokemon?.types[0].type.name}`} >
          <ul className={`Pokemon__data-dimension conteiner__img-backgraund-${dataPokemon?.types[0].type.name}`} >
            <li> <span className='PokemonCards__span'>Weight</span> {dataPokemon?.weight} </li>
            <li> <span className='PokemonCards__span'>Height</span> {dataPokemon?.height} </li>
          </ul>
          <p className={`Pokemon__data-dimension conteiner__img-backgraund-${dataPokemon?.types[0].type.name}`} > Abilities </p>
          <ul className='Pokemon__data-habilities'>
            {
              dataPokemon?.abilities.map(ability => <li key={ability.ability.name} className='Pokemon__data-habilities-li'> {ability.ability.name} </li>)
            }
          </ul>
        </div>
      </article>

     <article className={`Pokemon__moves  pokemoncards__background-${dataPokemon?.types[0].type.name}`}>
      <h2 className='Pokemon__moves-h2'> Moves </h2>
          <ul className='Pokemon__moves-lu'>
            {
              dataPokemon?.moves.map(move => <li key={move.move.name} className='Pokemon__moves-li'>{move.move.name}</li>  )
            }
          </ul>
     </article>

      </section>
    </main>
  )
}

export default Pokemon