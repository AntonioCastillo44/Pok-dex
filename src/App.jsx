import { Route, Routes } from 'react-router-dom'
import './App.css'
import HomeProtected from './components/HomeProtected'
import RouteProtector from './components/RouteProtector'
import Home from './pages/Home'
import Pokedex from './pages/Pokedex'
import Pokemon from './pages/Pokemon'


function App() {


  return (
    <div className="App">
      <Routes>

        <Route element={<HomeProtected/>} >
         <Route path='/' element={<Home/>}/>
        </Route>

         <Route element={<RouteProtector />}> 
          <Route path='/pokedex' element={<Pokedex />}/>
          <Route path='/pokedex/:id' element={<Pokemon />}/>
         </Route>
      </Routes>
    </div>
  )
}

export default App
 