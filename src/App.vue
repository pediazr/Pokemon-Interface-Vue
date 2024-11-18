<script setup>
import { ref, onMounted, computed } from 'vue';
import PokemonCard from './components/PokemonCard.vue';
import axios from 'axios';

const pokemons = ref([]);


const axiosPokemon = async () => {
    try {
        const { data } = await axios.get('https://pokeapi.co/api/v2/pokemon')
        const dataPokemons = [];

        for (const { url } of data.results) {
            const { data } = await axios.get(url);
            dataPokemons.push({
                name: data.name,
                url: data.sprites.other.dream_world.front_default,
                descubierto: false,
            });
        }

        pokemons.value = dataPokemons;
        console.log(pokemons.value)

    } catch (error) {
        console.log(error)
    }
}

const contador = computed(() => {
    return pokemons.value.filter(pokemon => pokemon.descubierto).length;
})

const descubierto = (namePokemon) => {
    const encontrado = pokemons.value.find((pokemon) => pokemon.name.toLowerCase() === namePokemon);
    if (encontrado) {
        encontrado.descubierto = true;
    }
}

onMounted(() => {
    axiosPokemon();
})

</script>

<template>
    <div class="container">
        <div class="row text-center">
            <div>
                <img src="/pokemon.png" alt="pokemon" class="w-50" />
            </div>
            <h1>¿Quién es este pokemon?</h1>
            <p>Pokemones encontrados: {{ contador }}</p>
            <PokemonCard v-for="(pokemon, id) in pokemons" :key="id" :namePoke="pokemon.name" :imgPoke="pokemon.url"
                @namePokemon="descubierto" />
        </div>
    </div>

</template>
<style scoped></style>