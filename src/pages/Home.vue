<script setup>
import { ref } from 'vue'
import { db } from '../main';
import { collection, query, getDocs} from "firebase/firestore";
import AddVideo from '../components/AddVideo.vue';
import Card from '../components/Card/Index.vue';

const videos = ref([])

getData()

function setVideoUser(doc) {
    videos.value.push({ id: doc.id, doc: { url: doc.url } })
}

async function getData() {
    const q = query(collection(db, "videos"));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        videos.value.push({ id: doc.id, doc: doc.data() })
    });
}



</script>
<template>
    <div class="container">
        <AddVideo @setVideoUser="setVideoUser" />
        <section>
            <Card v-for="item in videos" :item="item" />
        </section>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 30px;
    width: 100vw;
}

section {
    margin-top: 50px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
    grid-column: 2.5 / 9.5;
}

@media only screen and (max-width: 962px) {
    section {
        grid-template-columns: repeat(2, 1fr);
    }
}
@media only screen and (max-width: 630px) {
    section {
        grid-template-columns: repeat(1, 1fr);
    }
}
</style>