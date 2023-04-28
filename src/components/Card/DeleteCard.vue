<script setup>
import Button from "../Button.vue";
const props = defineProps({
    dialog: Boolean
})
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
                        <Button text="Eliminar" type="positive" />
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