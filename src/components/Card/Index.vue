<script setup>
import { defineProps, ref } from "vue";
import axios from 'axios';
import moment from 'moment';
import VideoDetail from "./VideoDetail.vue";
import DeleteCard from "./DeleteCard.vue";

const props = defineProps({
    item: Object
})
const emit = defineEmits(['emitDeleteCard'])

const video = ref({})
const videoId = ref('')
const deleted = ref(false)

var getLocation = function(href) {
    var l = document.createElement("a");
    l.href = href;
    return l;
};

function indexDeteleCard() {
    deleted.value = true
}

// Validando si hostname es youtube o youtu.be
let url = getLocation(props.item.doc.url)
if (url.hostname == 'youtu.be')  videoId.value = url.pathname.slice(1)
else videoId.value = props.item.doc.url.match(/v=([a-zA-Z0-9_-]+)/)[1]

const key = 'AIzaSyBLmZBGZIPRYrlShMFXgtirkq9ocCNYbdA'


const statusVideoDetailModal = ref(false)
function closeVideoDetailModal() {
    statusVideoDetailModal.value = false
}

const statusDeleteCardModal = ref(false)
function closeDeleteCardModal() {
    statusDeleteCardModal.value = false
}

axios.get(`https://www.googleapis.com/youtube/v3/videos?id=${videoId.value}&t=779s&key=${key}&part=snippet,contentDetails`)
.then((res) => {

    // Duracion del video
    const durationStr = res.data.items[0].contentDetails.duration;
    const duration = moment.duration(durationStr);
    video.value = { 
        id: res.data.items[0].id,
        miniature: res.data.items[0].snippet.thumbnails.standard.url,
        duration: duration.hours() + ":" + duration.minutes().toString().padStart(2, "0") + ":" + duration.seconds().toString().padStart(2, "0"),
        title: res.data.items[0].snippet.title,
        description: res.data.items[0].snippet.description
    }
})
</script>
<template>
    <Transition>
        <div v-if="!deleted">
            <div class="card" >
                <p class="card__p">{{ video.duration }}</p>
                <img class="detele" src="../../assets/delete.png" alt="X" @click="statusDeleteCardModal = true">
                <img class="miniature" :src="video.miniature" @click="statusVideoDetailModal = true">
            </div>
            <DeleteCard @closeDeleteCardModal="closeDeleteCardModal" @deleteCard="indexDeteleCard(id)" :dialog="statusDeleteCardModal" :item="props.item" />
            <VideoDetail @closeVideoDetailModal="closeVideoDetailModal" :dialog="statusVideoDetailModal" :item="video" />
        </div>
    </Transition>
</template>
<style scoped>
.card {
    width: 300px;
    height: 170px;
    padding: 0;
    position: relative;
}

.miniature {
    width: 300px;
    object-fit: cover;
    height: 170px;
}

.detele {
    z-index: 2;
    position: absolute;
    right: 5px;
    top: 5px;
    cursor: pointer;
}

.card__p {
    position: absolute;
    z-index: 2;
    color: white;
    right: 5px;
    bottom: 5px;
    background-color: #161616;
    padding: 3px;
}
.v-enter-active,
.v-leave-active {
  transition: all 1.2s ease;
}

.v-enter-from,
.v-leave-to {
  opacity: 0;
}
</style>