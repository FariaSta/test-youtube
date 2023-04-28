<script setup>
import { ref } from 'vue'
import { db } from '../main';
import { collection, query, getDocs } from "firebase/firestore";
import AddVideo from '../components/AddVideo.vue';
import Card from '../components/Card/Index.vue';

const videos = ref([])

getData()

async function getData() {
    videos.value = []
    const q = query(collection(db, "videos"));
    const querySnapshot = await getDocs(q);
    console.log(querySnapshot)
    querySnapshot.forEach((doc) => {
        console.log(doc.data())
        videos.value.push({ id: doc.id, doc: doc.data() })
        console.log(videos.value)
    });
}



</script>
<template>
    <div class="container">
        <div>
            <AddVideo @getData="getData" />
            <section>
                <Card v-for="item in videos" :item="item" />
            </section>
        </div>
    </div>
</template>
<style scoped>
.container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

section {
    margin-top: 50px;
    padding: 40px;
    display: grid;
    gap: 20px;
    grid-template-columns: repeat(3, 1fr);
}
</style>