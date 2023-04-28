<script setup>
import { ref } from "vue";
import axios from 'axios';
import Button from './Button.vue'
const emit = defineEmits(['getData'])

import { db } from '../main';
import { collection, addDoc } from "firebase/firestore";


const urlUser = ref('')
const errorValue = ref('')

async function send() {
    try {
        var getLocation = function (href) {
            var l = document.createElement("a");
            l.href = href;
            return l;
        };

        let url = getLocation(urlUser.value)
        let id
        if (url.hostname == 'youtu.be') id = url.pathname.slice(1)
        else id = urlUser.value.match(/v=([a-zA-Z0-9_-]+)/)[1]

        const key = 'AIzaSyBLmZBGZIPRYrlShMFXgtirkq9ocCNYbdA'
        let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&t=779s&key=${key}`)
        if (!res.data.items[0].id) errorValue.value = 'Este video no existe'
        else errorValue.value = ''
        if (!errorValue.value) {
            sendData()
        }
    } catch (error) {
        errorValue.value = 'Este video no existe'
    }

}

async function sendData() {
    const docRef = await addDoc(collection(db, "videos"), {url: urlUser.value});
    emit('getData')
    console.log("Document written with ID: ", docRef.id);
}
</script>
<template>
    <div class="add-video">
        <h1>
            Añadir nuevo video
        </h1>
        <div class="inputs-container">
            <input v-model="urlUser" type="text" placeholder="Añadir">
            <Button text="Añadir" type="positive" @click="send" />
        </div>
        <p v-if="errorValue">{{ errorValue }}</p>
    </div>
</template>
<style scoped>
.add-video {
    width: 100%;
}

.inputs-container {
    display: flex;
}

h1 {
    margin-bottom: 20px;
}

input {
    height: 50px;
    width: 100%;
    border: 1px solid rgb(133, 133, 133);
    border-radius: 5px 0px 0px 5px;
}
</style>