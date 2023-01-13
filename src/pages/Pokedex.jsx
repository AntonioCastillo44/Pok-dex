import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import ListPokemons from './ListPokemons'
import titlePokedex from '../img/7fdbe70629fd37b7fb04457e42c41f1d.png'
import { pagination } from '../helpers/pagination'

const Pokedex = () => {

  const nameTrainer = useSelector(state => state.nameTrainer)

  const [pokemons, setPokemons] = useState([])
  const [types, setTypes] = useState([])
  const [namePokemon, setNamePokemon] = useState("")
  const [pokemonFilter, setpokemonFilter] = useState([])
  const [pokemonType, setpokemonType] = useState("")
  const [currentPage, setCurrentPage] = useState(1)

  const handleSubmit = (e) => {
    e.preventDefault()
    setNamePokemon(e.target.namePokemon.value)
  }

  const handleSelect = (e) => {
    setpokemonType(e.target.value)
  }

  const {pagesInBlock, lastPage, pokemonInPage} = pagination(currentPage, pokemonFilter)


  const handleClickPage = (newPage) => {
    setCurrentPage(newPage)
  }

  const handleNextPage = () => {
    const newPage = currentPage + 1
    if(newPage > lastPage){
      setCurrentPage(1)
    } else {
      setCurrentPage(newPage)
    }
  }

  const handlePreviousPage = () => {
    const newPage = currentPage - 1
    if(newPage < 1){
      setCurrentPage(lastPage)
    } else {
      setCurrentPage(newPage)
    } 
  }


  useEffect(() => {
       axios.get(`https://pokeapi.co/api/v2/${pokemonType ? `type/${pokemonType}/` : "pokemon/?limit=1154" }`) //1154
       .then(res =>{
        if(pokemonType){
           const namePokemos = res.data.pokemon.map(pokemon => pokemon.pokemon)
           setPokemons(namePokemos)
        }else{
          setPokemons(res.data.results)
        }
       })
       .catch(err => console.log(err))
  }, [pokemonType])
  
  useEffect(() => {
      axios.get('https://pokeapi.co/api/v2/type/')
      .then(res => setTypes(res.data.results))
      .catch(err => console.log(err.data))
  }, [])
  
  useEffect(() => {
    const newPokemon = pokemons.filter(pokemon => pokemon.name.includes(namePokemon))
    setpokemonFilter(newPokemon)

  }, [namePokemon, pokemons])
  

  return (
    <main>
    <header className='Pokedex__header'>
      <div className='Pokedex__header-black'></div>
      <img className='titlePokedex' src={titlePokedex} />
      <div className='Pokedex__header-circle'> 
        <div className='Pokedex__header-cicle-int'> </div>
      </div>
    </header>

    <article className='Pokedex__search' >
      <p> Welcome <span className='Pokedex__search-span'>{nameTrainer}</span>, here you can find favorite pokemon </p>
      <form onSubmit={handleSubmit} className='Pokedex__search-form'>
      
          <input className='Pokedex__search-input' type="text"  placeholder='Search here in lower case...' id="namePokemon" />
          <button className='Pokedex__search-button' type="submit"> Search </button>
        
        <select className='Pokedex__search-select' onChange={handleSelect}>
          <option className='Pokedex__search-option' value=""> All pokemon </option>
          {
            types.map( type => <option value={type.name} key={type.url}>{type.name}</option> ) 
          }
        </select>
      </form>
    </article>

      <ListPokemons pokemonFilter={pokemonInPage}/>

      <ul className='Pokedex__ul'>
        <li className='Pokedex__li-page' onClick={handlePreviousPage}>{"<"}</li>
      {
        pagesInBlock.map(pageInBlock => <li className= {`Pokedex__li ${currentPage == pageInBlock ? "actualpage" : ""}`} onClick={() => handleClickPage(pageInBlock)} key={pageInBlock}>{pageInBlock}</li>)
      }
        <li className='Pokedex__li-page' onClick={handleNextPage}>{">"}</li>
      </ul>

    </main>
  )
}
  
export default Pokedex