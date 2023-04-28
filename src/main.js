import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const firebaseConfig = {
    apiKey: "AIzaSyB6x2fGdDJrHm9EU-ghFB6toivPCsKQvLg",
    authDomain: "test-afex-c96d9.firebaseapp.com",
    projectId: "test-afex-c96d9",
    storageBucket: "test-afex-c96d9.appspot.com",
    messagingSenderId: "904691691518",
    appId: "1:904691691518:web:44f18f1bab2586288d9aaf"
};

const firebase = initializeApp(firebaseConfig);
const db = getFirestore(firebase)

createApp(App).use(vuetify).use(firebase).mount('#app')

export { db }
