<script setup>
import { ref } from 'vue';

const props = defineProps({
    namePoke: {
        type: String,
        required: true,
    },
    imgPoke: {
        type: String,
        required: true,
    }
});

const emit = defineEmits(['namePokemon']);

const textInput = ref('');
const state = ref(false);
const correcto = ref(false);

const textName = () => {
    if (textInput.value.toLocaleLowerCase().trim() === props.namePoke.toLocaleLowerCase()) {
        state.value = true;
        emit('namePokemon', props.namePoke);
        textInput.value = '';
    }
    else {
        correcto.value = true;
        state.value = false;
        alert('Nombre incorrecto');
        textInput.value = '';
    }
}
</script>

<template>
    <div class="card col-3 border border-0 my-3">
        <img :class="[!state ? 'filtro' : '', 'pokemonImg', 'mx-auto']" :src="imgPoke" :alt="namePoke">
        <div v-if="state">
            <p>{{ props.namePoke }}</p>
        </div>
        <form v-else @submit.prevent="textName">
            <input class="col-12 form-control mb-2" v-model="textInput" />
            <button class="col-12 btn btn-light">Descubrir</button>
            <p v-show="correcto == true">Incorrecto, intentalo de nuevo</p>
        </form>
    </div>

</template>

<style scoped>
.pokemonImg {
    margin-top: 18px;
    width: auto;
    height: 100px;
    object-fit: cover;
}

.filtro {
    filter: blur(5px) grayscale(100%);
}
</style>