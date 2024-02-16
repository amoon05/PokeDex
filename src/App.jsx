import React from "react";
import styles from "./App.module.css";
import { useState, useEffect } from "react";
import Axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("")
  const [pokemonChosen, setPokemonChosen] = useState(false)
  const [pokemonData, setPokemonData] = useState(null)
  const [pokemonDataList, setPokemonDataList] = useState([])
  const [pokemon, setPokemon] = useState({
    name: "",
    species: "",
    picture: "",
    hp: "",
    attack: "",
    defense: "",
    specialAttack: "",
    specialDefense: "",
    speed: "",
    type: "",
  })

  const searchPokemon = () => {
    Axios.get(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => {
        console.log(response)
        setPokemon({
          name: pokemonName,
          picture: response.data.sprites.front_default,
          hp: response.data.stats[0].base_stat,
          attack: response.data.stats[1].base_stat,
          defense: response.data.stats[2].base_stat,
          specialAttack: response.data.stats[3].base_stat,
          specialDefense: response.data.stats[4].base_stat,
          speed: response.data.stats[5].base_stat,
          type: response.data.types[0].type.name,
        })
        setPokemonChosen(true)
      })
  }

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await Axios.get(`https://pokeapi.co/api/v2/pokemon?limit=1302`)
        console.log(response)
        const pokemonList = response.data.results;
        const fetchedPokemonDataList = [];
        for(let i = 0; i < pokemonList.length; i++) {
          const detailResponse = await Axios.get(pokemonList[i].url)
          fetchedPokemonDataList.push({
            name: pokemonList[i].name,
            picture: detailResponse.data.sprites.front_default,
          })
        }
        
        setPokemonDataList(fetchedPokemonDataList)
      } catch (error) {
        console.log("error", error)
      }
    }

    fetchPokemonData();
  }, [])
  return(
    <div className={styles.app}>
      <section className={styles.header}>
        <div className={styles.headerBackground}>
          <div className={styles.headerContainer}>
            <h2>
              PokeDex
            </h2>
            <div className={styles.searchContainer}>
              <input 
                type="text" 
                name="Pokemon Name" 
                placeholder="Pokemon Name"
                onChange = {(event) => {
                  setPokemonName(event.target.value);
                }}
              />
              <button
                onClick={searchPokemon}
              >
                Search Pokemon
              </button>
            </div>
            <h2>
              Favorites
            </h2>
          </div>
        </div>
      </section>
      <section className={styles.displaySearch}>
        <div className={styles.pokemonInfoContainer}>{!pokemonChosen ? (
        <h1>Please choose a Pokemon</h1>
        ) : (
          <>
            <h1>Name: {pokemon.name}</h1>
            <img src={pokemon.picture}/>
            <h2>Type: {pokemon.type}</h2>
            <h2>Hp Stats: {pokemon.hp}</h2>
            <h2>Attack Stats: {pokemon.attack}</h2>
            <h2>Defense Stats: {pokemon.defense}</h2>
            <h2>Special Attack Stats: {pokemon.specialAttack}</h2>
            <h2>Special Defense Stats: {pokemon.specialDefense}</h2>
            <h2>Sped Stats: {pokemon.speed}</h2>
          </>
        )}</div>
      </section>
      <section className={styles.displayList}>
        <div className={styles.container}>
          {!pokemonDataList.length ? (
          <p>Loading...</p>
        ) : (
          <div className={styles.pokemonListContainer}>
            {pokemonDataList.map((pokemonData) => (
              <div key={pokemonData.name} className={styles.pokemonInfoContainer}>
                  <h1>{pokemonData.name}</h1>
                  <img src={pokemonData.picture}/>
              </div>
            ))}
          </div>
        )}</div>
      </section>
    </div>
  )
}

export default App;