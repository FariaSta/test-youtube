<template>
    <div class="add-video">
        <h1>
            Añadir nuevo video
        </h1>
        <div class="inputs-container">
            <input type="text">
            <v-btn color="blue" width="253" height="50">Añadir</v-btn>
        </div>
    </div>
</template>
<style scoped>
.add-video {
    width: 80%;
}
.inputs-container{
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