<script setup>
import { ref } from "vue";
import axios from 'axios';
import { db } from '../main';
import { collection, addDoc, query, getDocs } from "firebase/firestore";
import Button from './Button.vue'
const emit = defineEmits(['setVideoUser'])

const urlUser = ref('')
const errorValue = ref('')
const correctValue = ref('')
const idYoutube = ref('')

async function send() {
    try {
        var getLocation = function (href) {
            var l = document.createElement("a");
            l.href = href;
            return l;
        };

        let url = getLocation(urlUser.value)
        let id
        if (url.hostname == 'youtu.be' || url.hostname == 'www.youtube.com') {
            if (url.hostname == 'youtu.be') id = url.pathname.slice(1)
            else id = urlUser.value.match(/v=([a-zA-Z0-9_-]+)/)[1]

            idYoutube.value = id

            const key = 'AIzaSyBLmZBGZIPRYrlShMFXgtirkq9ocCNYbdA'
            let res = await axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${id}&t=779s&key=${key}`)
            if (res.data.pageInfo.totalResults !== 0) errorValue.value = ''
            else errorValue.value = 'Este video no existe en Youtube'
            clearMessage()
            if (!errorValue.value) {
                sendData()
            }
        } else {
            errorValue.value = 'Enlace incorrecto'
            clearMessage()
        }
    } catch (error) {
        errorValue.value = 'Enlace incorrecto'
        clearMessage()
    }

}

function clearMessage() {
    setTimeout(() => {
        errorValue.value = ''
        correctValue.value = ''
    }, 4000);
}

async function sendData() {
    const q = query(collection(db, "videos"))
    const querySnapshot = await getDocs(q)
    let exists = false
    querySnapshot.forEach((doc) => {
        let data = doc.data()
        if (data.idYoutube == idYoutube.value) exists = true
    })
    if (!exists) {
        let docRef = await addDoc(collection(db, "videos"), { url: urlUser.value, idYoutube: idYoutube.value })
        emit('setVideoUser', { id: docRef.id, url: urlUser.value })
        correctValue.value = 'Video publicado'
        clearMessage()
    } else {
        errorValue.value = 'No puedes duplicar un video existente'
        clearMessage()
    }
}

</script>
<template>
    <div class="add-video">
        <div class="item">
            <h1>
                Añadir nuevo video
            </h1>
            <div class="inputs-container">
                <input v-model="urlUser" type="text" placeholder="Añadir">
                <Button text="Añadir" type="positive" @click="send" />
            </div>
            <div class="message" style="height: 30px;">
                <Transition>
                    <h3 v-show="errorValue"> <img src="../assets/incorrecto.gif"> {{ errorValue }}</h3>
                </Transition>
                <Transition>
                    <h3 v-show="correctValue"> <img src="../assets/correcto.gif"> {{ correctValue }}</h3>
                </Transition>
            </div>
        </div>
    </div>
</template>
<style scoped>
.add-video {
    width: 940px;
    display: flex;
    justify-content: center;
    align-items: center;
}

.item {
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

h3 {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
}

img {
    width: 40px;
}

.v-enter-active,
.v-leave-active {
  transition: opacity 1s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}

@media only screen and (max-width: 962px) {
    .add-video {
        width: 630px;
    }
}

@media only screen and (max-width: 728px) {
    .item {
        width: 300px;
    }
}
</style>