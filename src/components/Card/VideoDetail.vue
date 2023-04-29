<script setup>
import { defineProps } from "vue";
const props = defineProps({
    dialog: Boolean,
    item: Object
})
</script>
<template>
    <template>
        <div class="text-center">
            <v-dialog v-model="props.dialog" width="930px">
                <v-card>
                    <div class="container">
                        <img class="close" src="../../assets/close.png" alt="X"  @click="$emit('closeVideoDetailModal')">
                        <iframe width="40%" height="308"
                        :src="`https://www.youtube.com/embed/${props.item.id}`">
                        </iframe>
                        <div class="info">
                            <h4>{{props.item.title}}</h4>
                            <p>{{props.item.description.slice(0, 220)}}...</p>
                        </div>
                    </div>
                </v-card>
            </v-dialog>
        </div>
    </template>
</template>
<style scoped>
.container {
    display: flex;
    padding: 30px;
    justify-content: center;
    align-items: center;
    position: relative;
}
.info {
    padding: 40px;
    margin-top: 20px;   
    width: 60%;
}
iframe {
    margin-left: 15px;
    width: 40%;
}
.info h4 {
    margin-bottom: 10px;
}
.close {
    position: absolute;
    top: 15px;
    right: 15px;
    width: 22px;
    cursor: pointer;
}
@media only screen and (max-width: 640px) {
    .container{
        flex-direction: column;
    }
    .info {
        width: 100%;
        padding: 20px;
    }
    iframe {
    width: 90%;
}
}
</style>