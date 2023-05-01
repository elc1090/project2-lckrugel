import Container from 'react-bootstrap/Container';

import captalizeFirstLetter from '../utils/captalizeFirstLetter';
import typeDisplay from '../utils/typeDisplay';
import './PokemonInfo.css';


export default function PokemonInfo(props) {

  return (
    <Container id="PokemonInfo">
      <img
        src={props.pokemon.sprites.other['official-artwork'].front_default}
        alt={'The Pokémon' + captalizeFirstLetter(props.pokemon.name)}
      />
      <h2 id="name">{captalizeFirstLetter(props.pokemon.name)}</h2>

      <ul id="types">
        {props.pokemon.types.map((tp) => 
          typeDisplay(tp.type.name, tp.slot)
        )}
      </ul>

      <h5>Abilities</h5>
      <ul id="abilities">
        {props.pokemon.abilities.map((ability) => 
          <li key={ability.slot}>{captalizeFirstLetter(ability.ability.name)}</li>
        )}
      </ul>
    </Container>
  );
};


