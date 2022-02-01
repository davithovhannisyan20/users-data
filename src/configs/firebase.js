import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: 'AIzaSyDr9Q6BKTa8WrB5rmVEi5XyqkqFoMGHruI',
    authDomain: 'users-data-555e3.firebaseapp.com',
    projectId: 'users-data-555e3',
    storageBucket: 'users-data-555e3.appspot.com',
    messagingSenderId: '375879785448',
    appId: '1:375879785448:web:8767568e47e107d0db625d'
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db }