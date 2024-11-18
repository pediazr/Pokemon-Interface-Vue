// Importa axios como módulo ES
import axios from "axios";

// Define la variable pokemon para almacenar los datos
let pokemon = { value: [] };

// Función para obtener los Pokémon
const axiosPokemon = async () => {
  try {
    const { data } = await axios.get(
      "https://pokeapi.co/api/v2/pokemon?limit=20"
    );
    const pokemones = [];
    //console.log(data);
    //console.log(data.results);
    for (const { url } of data.results) {
      const { data } = await axios.get(url);
      pokemones.push({
        name: data.name,
        url: data.sprites.other.dream_world.front_default,
        descubierto: false,
      });
    }
    pokemon.value = pokemones;
    console.log(pokemon.value);
  } catch (error) {
    console.error(error);
  }
};

// Ejecuta la función
axiosPokemon();
