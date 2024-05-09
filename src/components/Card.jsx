
import '../styles/Card.css'

function Card({ name, imgSrc, onClick }) {
  
    return (
      <button className='card-container' onClick={onClick}>
        <div className='img-container'>
            <img src={imgSrc} alt="Pokemon" />
        </div>
        <h1>{name}</h1>
      </button>
    )
  }
  
  export default Card