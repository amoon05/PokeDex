import React from "react";
import styles from "./App.module.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [pokemonName, setPokemonName] = useState("")

  const searchPokemon = () => {

  }
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
    </div>
  )
}

export default App;