import React from 'react'
import { useDispatch } from 'react-redux'
import { setNameTrainerGlobal } from '../store/slices/nameTrainer.slice'
import titlePokedex from '../img/7fdbe70629fd37b7fb04457e42c41f1d.png'
import pokedex from '../img/4d512e111400557.Y3JvcCw0MTY3LDMyNTksMCw0NTM-removebg-preview.png'
import pokedekMobile from '../img/4d512e111400557.png'
import pokedekMobiles from '../img/4d512e-removebg-preview.png'
const Home = () => {

const dispatch = useDispatch()


  const handleSubmit = (e) =>{
    e.preventDefault()
    const nameTrainer = e.target.nameTrainer.value.trim()
    dispatch(setNameTrainerGlobal(nameTrainer))
  }


  return (
  <main className='Home' >
   <article className='Home__article'> 
    <img className='pokedex-pc' src={pokedex} />
    <img className='pokedekMobile' src={pokedekMobile} />
    <img className='pokedekMobiles' src={pokedekMobiles} />
    <h1 className='Home__h1' > Hi, trainer! </h1>
    <div className=' Home__conteiner '>
        <p className='Home__p' > To start, give me your name </p>
        <form  className='Home__form' onSubmit={handleSubmit}>
           <input className='Home__input' required type="text" placeholder='Your name...' id="nameTrainer" />
          <button className='Home__btn' > Star! </button>
        </form>
    </div>
    </article>

    <div className='Home__title' >
    <img  className='Home__title-img' src={titlePokedex} alt="" />   
   </div>

  </main>
  )
}

export default Home
