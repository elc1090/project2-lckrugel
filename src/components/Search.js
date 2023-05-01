import { useState } from 'react';
import Button from 'react-bootstrap/Button';

import './Search.css';
import randomPokemonId from '../utils/randomPokemon';


export default function Search(props) {
  const [searchField, setSearchField] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    props.getPokemonSearch(searchField.toLowerCase());
  }

  function handleChange(e) {
    setSearchField(e.target.value);
  }

  function handleRandomizer() {
    let randomId = randomPokemonId();
    props.getPokemonSearch(randomId);
  }

  return (
    <>
      <form onSubmit={handleSubmit}>
          <input
            name="pokemon"
            type="text"
            placeholder="Pokemon name or Pokedex number"
            onChange={handleChange}
          >
          </input>          
          <button type="button" onClick={handleRandomizer}>
              <img src={require('../assets/random_icon.png')} style={{width:24}} alt='Randomize'></img>
          </button>
          <Button variant="outline-dark" type="submit">Search</Button>
      </form>      
    </>
  )
}
