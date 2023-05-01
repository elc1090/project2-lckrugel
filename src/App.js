import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

import './App.css';
import { api } from "./utils/api";
import PokemonInfo from "./components/PokemonInfo";
import Search from "./components/Search";
import TypeRelationsInfo from "./components/TypeRelationsInfo";
import typeRelations from "./utils/typeRelations";
import Errors from "./utils/Errors"


export default function App() {
  const [currentPokemon, setCurrentPokemon] = useState();
  const [currentTypes, setCurrentTypes] = useState();
  const [pokemonSearch, setPokemonSearch] = useState(7); // Vem com o id padrão do Squirtle
  const [error, throwError] = useState(false);

  useEffect(() => {
    async function getPokemonAndTypes(pokemonSearch) {
      try {
        const response = await fetch(api+'/pokemon/'+pokemonSearch+'/');
        const data = await response.json();

        if(data) {          
          setCurrentPokemon(data);
          let types = [];
          try {
            for(let t of data.types) {
              const responseT = await fetch(t.type.url);
              const dataT = await responseT.json();

              if(dataT) types.push(dataT);
            }
            setCurrentTypes(types);
          } catch(e) {
            console.log("Could not get types from API."+e);            
            return;
          }
        }
        
      } catch(e){
        console.log("Could not get Pokemon from API."+e);
        throwError(true);
        return;
      }
    }

    getPokemonAndTypes(pokemonSearch);
  }, [pokemonSearch])

  function getTypeRelations(currentTypes) {    
    return typeRelations(currentTypes);   
  }

  return (
    <Container id="App" fluid className="mt-5">
      <Row className="mt-3">
        <header>
            <h1>PokéHelper</h1>
            <Search getPokemonSearch={setPokemonSearch}></Search>      
        </header>
      </Row>
      { currentPokemon && 
        <Row className="mt-3" id="Info">
          <Col id="PokemonInfo">
            <PokemonInfo pokemon={currentPokemon}></PokemonInfo>
          </Col>
          <Col id="TypesInfo">
            { currentTypes && 
              <TypeRelationsInfo typeRelations={getTypeRelations(currentTypes)}></TypeRelationsInfo>
            }
          </Col>
        </Row>
      }
      { error && 
      <Errors></Errors>
      }
    </Container>
  )
}
