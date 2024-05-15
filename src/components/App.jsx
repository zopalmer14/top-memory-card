
import { useState, useEffect } from 'react'
import Card from './Card.jsx'
import pokeImage from '../assets/eevee.jpg'
import '../styles/App.css'

// example Card data
const examplePokemonData = {
  name: 'Eevee',
  imgSrc: pokeImage,
}

const onCardClick = function onCardClick(event) {
  return event.target;
}

// pokemon count / diagnostic data retrieval
async function getDiagnosticInfo(keyword) {
  try {
    // grab the resource/API info for the pokemon data 
    const response = await fetch(`https://pokeapi.co/api/v2/${keyword}/`)
    const diagnosticData = await response.json()
    return diagnosticData
  } catch (error) {
    console.log(error)
  }
}

// grab the number of available pokemon from the API
/* POKE_COUNT = await getDiagnosticInfo('pokemon').then((response) => {
  return response.count
}) */

// individual pokemon data retrieval
async function getPokemonInfo(id) {
  try {
    // grab the data for the given pokemon
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
    const pokemonInfo = await response.json()
    return pokemonInfo
  } catch (error) {
    console.log(error)
  }
}

// CONSTANTS
const POKE_COUNT = 1025
const NUM_CARDS = 8

// gather the pokemon data for each card 
async function gatherPokeData() {
  const pokeData = []
  for(let i = 0; i < NUM_CARDS; i+=1) {
    const randomId = Math.floor(Math.random() * POKE_COUNT);

    const apiData = await getPokemonInfo(randomId).then((response) => {
      return {
        id: randomId,
        name: response.name,
        imgSrc: response.sprites.front_default
      }
    })

    pokeData.push(apiData)
  }
  return pokeData
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [pokeData, setPokeData] = useState([])

  // side effect that grabs the PokeAPI data 
  useEffect(() => {
    gatherPokeData().then((response) => {
      setPokeData(response)
    })
  }, [])

  return (
    <>
      <div className='header'>
        <h1><span>Poke</span>Base / Data<span>Mon</span></h1>
        <div className='scoreboard'>
          <div><span>Score: </span>{score} / {NUM_CARDS}</div>
          <div><span>High Score: </span>{highScore}</div>
        </div>
      </div>
      <div className='card-collection'>
        {pokeData && pokeData.map((data) => {
          return (
            <Card 
              key={data.id}
              name={data.name}
              imgSrc={data.imgSrc}
              onClick={onCardClick}
            />
          )
        })}
      </div>
    </>
  )
}

export default App
