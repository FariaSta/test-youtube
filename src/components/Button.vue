<script setup>
import { defineProps } from "vue";
const props = defineProps({
    text: String,
    type: String
})

let positiveStyle = {
    'background': '#136AE4',
    'color': 'white',
}
let negativeStyle = {
    'border': '1px solid #136AE4',
    'background': 'white',
    'color': '#136AE4',
}

</script>
<template>
    <button :style="type === 'positive' ? positiveStyle : negativeStyle">
        {{ text }}
    </button>
</template>
<style scoped>
button {
    width: 253px;
    height: 50px;
    border-radius: 3px;
    font-family: 'Montserrat';
    font-weight: 700;
    text-align: center;
}
</style>