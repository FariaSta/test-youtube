<script setup>
import Button from "../Button.vue";
import { db } from '../../main';
import { doc, deleteDoc } from "firebase/firestore";
const emit = defineEmits(['closeDeleteCardModal', 'deleteCard'])

const props = defineProps({
    dialog: Boolean,
    item: Object
})

async function deleteVideo() {
    await deleteDoc(doc(db, "videos", props.item.id));
    emit('deleteCard', props.item.id)
    emit('closeDeleteCardModal')
}
</script>
<template>
    <div class="text-center">
        <v-dialog v-model="props.dialog" width="50vw">
            <v-card>
                <v-card-text>
                    <p class="modal-delete__p">
                        ¿Seguro que quieres eliminar este video?
                    </p>
                </v-card-text>
                <v-card-actions>
                    <div class="buttons">
                        <Button text="Cancelar" type="negative" @click="$emit('closeDeleteCardModal')" />
                        <Button text="Eliminar" type="positive" @click="deleteVideo()" />
                    </div>
                </v-card-actions>
            </v-card>
        </v-dialog>
    </div>
</template>
<style scoped>
.modal-delete__p {
    font-size: 24px;
    font-weight: 500;
    line-height: 38px;
    padding: 30px;
}

.buttons {
    display: flex;
    width: 100%;
    justify-content: flex-end;
    gap: 20px;
    margin-right: 10px;
    margin-bottom: 20px;
}
</style>