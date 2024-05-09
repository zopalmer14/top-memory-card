
import { useState } from 'react'
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

// create Card collection
const NUM_CARDS = 8
const cards = []
for(let i = 0; i < NUM_CARDS; i+=1) {
  cards.push(
    <Card 
      name={examplePokemonData.name}
      imgSrc={examplePokemonData.imgSrc}
      onClick={onCardClick}
    />
  )
}

function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

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
        {cards}
      </div>
    </>
  )
}

export default App
